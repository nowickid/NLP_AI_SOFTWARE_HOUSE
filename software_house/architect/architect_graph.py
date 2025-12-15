from software_house.state import State
from .architect_tools import tools

from langchain_core.messages import SystemMessage, HumanMessage
from llm import gemini
from langgraph.prebuilt import ToolNode
from tokens_sum import accumulate_tokens
from langgraph.graph import StateGraph, START, END

from typing import Literal
from config import GENERATE_GRAPHS, GRAPHS_DIR
import logging
from pathlib import Path
from utils import save_graph_visualization

llm_with_tools = gemini.bind_tools(tools)
tool_node = ToolNode(tools)
logger = logging.getLogger(__name__)

def prepare_input(state: State):
    if not state["messages"]:
        logger.info("[Architect] received user request: %s", {state['user_requests']})
        system_prompt = """
            You are the Lead Architect and Technical Project Manager, an advanced AI specialized in designing complex systems and orchestrating development workflows.

            CRITICAL OPERATIONAL CONSTRAINT:
            You function exclusively as an orchestrator. YOU CAN ONLY USE THE PROVIDED TOOLS. Do not output any conversational text or explanations outside of tool usage. Any non-tool output will be ignored.

            YOUR CORE RESPONSIBILITIES:

            1. Project Breakdown & Planning:
            - Analyze user requirements deeply.
            - **Dynamic Sprint Sizing:** Adjust the granularity of the Sprint based on the project's complexity:
                - **For Complex Projects:** Decompose into logical, functional milestones (e.g., "Sprint 1: Core Database Logic", "Sprint 2: API Endpoints").
                - **For Simple/Small Requests:** Encapsulate the **ENTIRE** request into a **SINGLE** Sprint. Do not artificially fragment small tasks (e.g., if the user wants a single script, the Sprint Goal is "Create and finalize the script").
            - **Sprint Definition:** Regardless of size, a Sprint Goal must describe a deliverable value (working code/feature), not just a mechanical step.

            2. Task Delegation:
            - Dispatch actionable tasks to the Development Team based on the defined Sprint Goal.
            - CRITICAL: The Development Team is stateless and has NO MEMORY of previous interactions.
            - You MUST provide specific, self-contained instructions for every task. Include all necessary context, relevant file paths, code snippets, and architectural decisions within the task payload to ensure the developer has everything needed to execute the task immediately.

            3. Documentation Management:
            - Maintain the `README.md` file as the single source of truth for the system's architecture.
            - Update the `Changelog` file specifically upon receiving a progress report or summary from the Manager. Ensure these updates accurately reflect the completed work.

            4. Progress Monitoring & Iteration:
            - Continuously monitor the Development Team's progress through their reports.
            - Iterate on task assignments based on feedback and evolving project needs.
        """
        return {
            "messages": [
                SystemMessage(content=system_prompt),
                HumanMessage(content=f"""
                USER REQUEST:
                {state['user_requests']}
                """)
            ]
        }
    
    return {}

def prepate_next_step(last_message):
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        for tool_call in last_message.tool_calls:
            if tool_call["name"] == "delegate_task":
                return{
                    "sprint_goal": tool_call["args"]["sprint_goal"],
                    "project_context": tool_call["args"]["project_context"],
                    "next_step": "team"
                }
            
            elif tool_call["name"] == "update_changelog":
                if tool_call["args"].get("isProjectComplete"):
                    return{
                        "next_step": END
                    }
                
    return {"next_step": "call_model"}

def call_model(state: State):
    response = llm_with_tools.invoke(state["messages"])
    metadata = response.usage_metadata
    accumulate_tokens(metadata["input_tokens"], metadata["output_tokens"], "architect")

    next_step_update = prepate_next_step(response)

    return{
        "messages": response,
        **next_step_update
    }



def route(state: State) -> Literal["call_model", END]:
    return "call_model" if state["next_step"] == "call_model" else END

def architect_node(state: State):
    graph = StateGraph(State)

    graph.add_node("prepare_input", prepare_input)
    graph.add_node("call_model", call_model)
    graph.add_node("tool_node", tool_node)

    graph.add_edge(START, "prepare_input")
    graph.add_edge("prepare_input", "call_model")
    graph.add_edge("call_model", "tool_node")
    graph.add_conditional_edges("tool_node", route)

    architect_process = graph.compile()

    if GENERATE_GRAPHS:
        save_graph_visualization(
            architect_process.get_graph().draw_mermaid_png(),
            "architect_graph.png"
        )

    result = architect_process.invoke(state)
    return result