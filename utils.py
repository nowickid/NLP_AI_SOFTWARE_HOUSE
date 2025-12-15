from pathlib import Path
from config import WORKSPACE_DIR, GRAPHS_DIR
from langchain_core.tools import tool
import logging

logger = logging.getLogger(__name__)

@tool
def list_files(path = ""):
    """Returns a list of all files in the specified directory and its subdirectories. 
    If no path is provided, lists files in the root workspace directory."""
    logger.info(f"      Listing files in path: '{path}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_dir = (root_dir / path).resolve()

    if not target_dir.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{path}'."

    if not target_dir.exists():
        return f"Error: The specified path '{path}' does not exist."

    files = [
        str(f.relative_to(root_dir)) 
        for f in target_dir.rglob("*") 
        if f.is_file()
    ]
    
    return "\n".join(files) if files else "No files found."


@tool
def write_to_file(filename, content):
    """Writes the given content to a file with the specified filename in the workspace directory."""
    logger.info(f"      Writing to file: '{filename}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_file = (root_dir / filename).resolve()

    if not target_file.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{filename}'."

    target_file.parent.mkdir(parents=True, exist_ok=True)

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)

    return f"Successfully wrote to file '{filename}'."

@tool
def read_file(filename):
    """Reads and returns the content of the specified file from the workspace directory."""
    logger.info(f"      Reading file: '{filename}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_file = (root_dir / filename).resolve()

    if not target_file.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{filename}'."

    if not target_file.exists():
        return f"Error: The specified file '{filename}' does not exist."

    with open(target_file, "r", encoding="utf-8") as f:
        content = f.read()

    return content

def save_graph_visualization(png, filename):
    try:
        filepath = Path(GRAPHS_DIR) / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "wb") as f:
            f.write(png)
    except:
        print(f"Exception occurred while saving graph visualization. {filename} not saved.")