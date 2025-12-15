from .state import State
from software_house.architect.architect_graph import architect_node
from langgraph.graph import StateGraph, START, END
from software_house.team.team import team_node
from typing import Literal
from config import GENERATE_GRAPHS, SOFTWARE_HOUSE_RECURSION_LIMIT, BACKUP_DIR
from utils import save_graph_visualization
from langchain_core.messages import messages_to_dict, messages_from_dict
import datetime
import os
import json

def doBackup(state: State):    
    backup_data = dict(state).copy()
    
    if "messages" in backup_data:
        backup_data["messages"] = messages_to_dict(backup_data["messages"])

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    os.makedirs(BACKUP_DIR, exist_ok=True)
    filename = f"{BACKUP_DIR}/software_house_backup_{timestamp}.json"

    with open(filename, "w", encoding='utf-8') as f:
        json.dump(backup_data, f, indent=4, ensure_ascii=False)

    
def loadBackup(filepath: str):
    with open(filepath, "r", encoding='utf-8') as f:
        loaded_data = json.load(f)
    
    if "messages" in loaded_data:
        loaded_data["messages"] = messages_from_dict(loaded_data["messages"])
        
    return loaded_data

def route(state: State) -> Literal["team", END]:
    if state["next_step"] == "team":
        doBackup(state)
        return "team"
    else:
        return END

def prepare_graph(state: State):
    graph = StateGraph(State)
    graph.add_node("architect", architect_node)
    graph.add_node("team", team_node)
    graph.add_edge(START, "architect")
    graph.add_conditional_edges("architect", route)
    graph.add_edge("team", "architect")
    return graph

def run_software_house(user_request):
    state = State(
        user_requests=user_request,
        messages=[]
    )
    graph = prepare_graph(state)
    software_house_process = graph.compile()

    if GENERATE_GRAPHS:
        save_graph_visualization(software_house_process.get_graph().draw_mermaid_png(), "software_house_graph.png")

    result = software_house_process.invoke(state,
        config={
            "recursion_limit": SOFTWARE_HOUSE_RECURSION_LIMIT,
        }
    )
    return result

