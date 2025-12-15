from utils import list_files
from langchain.tools import tool
from software_house.team.team_state import TaskStucture, ReportStructure
from docs_tools import get_documentation
import logging
logger = logging.getLogger(__name__)

@tool(args_schema=TaskStucture)
def submit_task(task, context, system_message):
    """
    Submits a task to a worker with the given context and system message.
    """
    
    logger.info("       Submitting task to worker: %s", task)
    return "Task submitted to worker"

@tool(args_schema=ReportStructure)
def submit_final_report(report):
    """
    Call this tool ONLY when you have completed the task to submit the final report to the supervisor.
    """
    logger.info("       Submitting final report to supervisor.")
    return "Final report submitted to supervisor"

tools = [submit_task, submit_final_report, get_documentation, list_files]