from langgraph.graph import StateGraph, START, END
from .worker_state import WorkerState
from .worker_tools import tools, kill_background_processes, tmp_list_files
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.prebuilt import ToolNode
from llm import gemini, local_llm
from tokens_sum import accumulate_tokens
from typing import Literal
from config import WORKER_RECURSION_LIMIT, GENERATE_GRAPHS
import logging

llm_with_tools = gemini.bind_tools(tools)
# llm_with_tools = local_llm.bind_tools(tools)

tool_node = ToolNode(tools)
logger = logging.getLogger(__name__)


def prepare_input(state: WorkerState):
    project_files = tmp_list_files()

    logger.info("[Worker] task to do: %s, \n\n project stuct: %s", {state['task']}, {project_files})
    return {
        "messages": [
            SystemMessage(content=f"""{state['system_message']}\n
                          RULES:
- If you need to create a file, call 'write_to_file' immediately.
- If you need to read, call 'read_file'.
- DO NOT describe what you will do. DO NOT output code blocks.
- JUST CALL THE TOOLS.
- If you deem the task fully completed, write a concise report on it
                          """),
            HumanMessage(content=f"CONTEXT: {state['context']}\nTASK TO DO: {state['task']}, \n \n CURRENT PROJECT FILES: {project_files}"),
        ],
        "iteration": 1
    }

def call_model(state: WorkerState):
    if state["iteration"]  == WORKER_RECURSION_LIMIT:
        logger.warning("[Worker] Reached maximum recursion limit (%d). Generating final report.", WORKER_RECURSION_LIMIT)
        state["messages"].append(HumanMessage(content="You have reached the maximum number of iterations. Please provide a concise final report on the task. DO NOT USE TOOLS ANYMORE."))
    
    response = llm_with_tools.invoke(state["messages"])
    metadata = response.usage_metadata
    accumulate_tokens(metadata["input_tokens"], metadata["output_tokens"], role="worker")
    return{
        "messages": response,
        "iteration": state["iteration"] + 1
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
    report = result["messages"][-1]

    report_content = report.content

    if isinstance(report_content, str):
        text_report = report_content
    elif isinstance(report_content, list):
        text_report = "\n".join(
            item["text"] for item in report_content 
            if isinstance(item, dict) and "text" in item
        )
        if not text_report:
            text_report = str(report_content)
    else:
        text_report = str(report_content)

    logger.info("[Worker] generated report: %s", text_report)
    return text_report