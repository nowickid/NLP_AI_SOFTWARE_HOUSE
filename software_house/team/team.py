from ..state import State
from .team_state import TeamState
from software_house.team.worker.worker import worker_node
from software_house.team.menager.menager_graph import menager_node
from langgraph.graph import StateGraph, START, END
from typing import Literal
from config import GENERATE_GRAPHS, TEAM_RECURSION_LIMIT

def route(state: TeamState) -> Literal["worker", END]:
    return "worker" if state["next_step"] == "worker" else END

def team_node(state: State):
    team_state = TeamState(
        sprint_goal=state["sprint_goal"],
        project_context=state["project_context"],
        messages=[]
    )
    graph = StateGraph(TeamState)
    graph.add_node("menager", menager_node)
    graph.add_node("worker", worker_node)
    graph.add_edge(START, "menager")
    graph.add_conditional_edges("menager", route)
    graph.add_edge("worker", "menager")
    team_process = graph.compile()
    result = team_process.invoke(team_state,
                                 config={
            "recursion_limit": TEAM_RECURSION_LIMIT,
        }
    )
    if GENERATE_GRAPHS:
        from utils import save_graph_visualization
        save_graph_visualization(
            team_process.get_graph().draw_mermaid_png(),
            "team_graph.png"
        )

    report = result.get("report", "No report generated.")  
    return {
        "messages": f"Team completed the sprint and manager generated a report:\n{report}"
    }