from typing import TypedDict, Annotated
from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages


class WorkerState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    system_message: str
    context: str
    task: str
    iteration: int