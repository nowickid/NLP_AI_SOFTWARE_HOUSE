from utils import list_files
from langchain.tools import tool
import os
from config import DOCS_DIR
from docs_tools import get_documentation
from software_house.state import UpdateChangeLogStructure, DelegateTaskStructure, State
import logging

logger = logging.getLogger(__name__)

sprint = 0

@tool
def update_readme(content):
    """
        Use this tool to update the README.md file with the provided content.
    """
    logger.info("       Updating README.md with new content.")
    filepath = os.path.join(DOCS_DIR, "README.md")
    directory = os.path.dirname(filepath)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    return "README.md has been updated successfully."

@tool(args_schema=UpdateChangeLogStructure)
def update_changelog(changes: str, isProjectComplete: bool):
    """
    Updates the changelogs.md file.
    
    CRITICAL RULE: You are ALLOWED to use this tool ONLY after receiving a progress report or summary from the Manager.
    IT IS STRICTLY FORBIDDEN to use this tool in any other context (e.g., during planning, delegation, or based on your own assumptions).
    If you have not received a Manager's report, DO NOT use this tool.
    """
    logger.info("       Updating changelogs.md with changes from sprint %d.", sprint)
    filepath = os.path.join(DOCS_DIR, "changelogs.md")
    directory = os.path.dirname(filepath)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

    with open(filepath, "a", encoding="utf-8") as f:
        f.write(f"{changes}\n\n")

    return  f"changelogs.md has been updated with changes from sprint {sprint}."


@tool(args_schema=DelegateTaskStructure)
def delegate_task(sprint_goal: str, project_context: str):
    """
    CRITICAL TOOL: This is the ONLY way to generate code or implement features.
    Use this to send specific instructions to the Development Team. 
    Without calling this, no coding work will happen.
    """
    logger.info("       Delegating task to Development Team for sprint goal: %s", sprint_goal)
    
    return "Task delegated to Development Team."


def next_sprint(state: State):
    global sprint
    sprint += 1

tools = [list_files, update_readme, get_documentation, update_changelog, delegate_task]