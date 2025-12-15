from ..team_state import TeamState
from .worker_graph import process_worker_graph
from .worker_state import WorkerState


def worker_node(state: TeamState):
    worker_state: WorkerState = {
        "messages": [],
        "task": state["worker_task"],
        "context": state["worker_context"],
        "system_message": state["worker_system_message"],
    }
    report = process_worker_graph(worker_state)
    return {
        "messages": f"Worker completed the task and generated a report:\n{report}"
    }
    