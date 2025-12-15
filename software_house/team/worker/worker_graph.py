from langgraph.graph import StateGraph, START, END
from .worker_state import WorkerState
from .worker_tools import tools, kill_background_processes
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.prebuilt import ToolNode
from llm import gemini
from tokens_sum import accumulate_tokens
from typing import Literal
from config import WORKER_RECURSION_LIMIT, GENERATE_GRAPHS
import logging

llm_with_tools = gemini.bind_tools(tools)
tool_node = ToolNode(tools)
logger = logging.getLogger(__name__)


def prepare_input(state: WorkerState):
    logger.info("Worker task to do: %s", {state['task']})
    return {
        "messages": [
            SystemMessage(content=f"{state['system_message']}\n If you deem the task fully completed, write a concise report on it"),
            HumanMessage(content=f"CONTEXT: {state['context']}\nTASK TO DO: {state['task']}"),
        ]
    }

def call_model(state: WorkerState):
    response = llm_with_tools.invoke(state["messages"])
    metadata = response.usage_metadata
    accumulate_tokens(metadata["input_tokens"], metadata["output_tokens"], role="worker")
    return{
        "messages": response
    }

def route(state: WorkerState) ->Literal["tool_node", END]:
    last_message = state["messages"][-1]

    if not last_message.tool_calls:
        return END
    
    return "tool_node"
    
def process_worker_graph(state: WorkerState):
    graph = StateGraph(WorkerState)
    
    graph.add_node("prepare_input", prepare_input)
    graph.add_node("call_model", call_model)
    graph.add_node("tool_node", tool_node)
    
    graph.add_edge(START, "prepare_input")
    graph.add_edge("prepare_input", "call_model")

    graph.add_conditional_edges("call_model", route)

    graph.add_edge("tool_node", "call_model")

    worker_process = graph.compile()

    if GENERATE_GRAPHS:
        from utils import save_graph_visualization
        save_graph_visualization(worker_process.get_graph().draw_mermaid_png(), "worker_graph.png")

    result = worker_process.invoke(state,
        config={
            "recursion_limit": WORKER_RECURSION_LIMIT,
        }
    )
    kill_background_processes()
    report_content = result["messages"][-1].content

    if isinstance(report_content, list):
        text_report = report_content[0].get("content", "")
    else:
        text_report = str(report_content)

    logger.info("Worker generated report: %s", text_report)
    return text_report