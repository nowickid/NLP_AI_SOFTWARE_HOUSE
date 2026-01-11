from pathlib import Path
from config import WORKSPACE_DIR, GRAPHS_DIR
from langchain_core.tools import tool
import logging

logger = logging.getLogger(__name__)

@tool
def list_files(path = ""):
    """Returns a list of all files in the specified directory and its subdirectories,
    excluding files in ignored directories like node_modules, __pycache__ ..."""
    logger.info(f"      Listing files in path: '{path}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_dir = (root_dir / path).resolve()

    if not target_dir.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{path}'."

    if not target_dir.exists():
        return f"Error: The specified path '{path}' does not exist."

    # Lista katalogów do zignorowania - możesz tu dodać więcej (np. .venv, dist, build)
    IGNORED_FOLDERS = {"node_modules", ".git", "__pycache__", ".venv", "venv", ".idea", ".vscode"}

    files = []
    # Używamy rglob do znalezienia wszystkich plików
    for f in target_dir.rglob("*"):
        if f.is_file():
            rel_path = f.relative_to(root_dir)
            
            # Sprawdź, czy jakakolwiek część ścieżki (folder nadrzędny) jest na liście ignorowanych
            # rel_path.parts rozbija ścieżkę na tuple, np. ('project', 'node_modules', 'package.json')
            path_parts = set(rel_path.parts)
            
            # Jeśli część wspólna zbiorów nie jest pusta, to znaczy, że plik jest w ignorowanym folderze
            if not path_parts.intersection(IGNORED_FOLDERS):
                files.append(str(rel_path))
    
    return "\n".join(files) if files else "No files found."

def tmp_list_files(path = ""):
    """Returns a list of all files in the specified directory and its subdirectories,
    excluding files in ignored directories like node_modules, __pycache__ ..."""
    logger.info(f"      Listing files in path: '{path}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_dir = (root_dir / path).resolve()

    if not target_dir.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{path}'."

    if not target_dir.exists():
        return f"Error: The specified path '{path}' does not exist."

    # Lista katalogów do zignorowania - możesz tu dodać więcej (np. .venv, dist, build)
    IGNORED_FOLDERS = {"node_modules", ".git", "__pycache__", ".venv", "venv", ".idea", ".vscode"}

    files = []
    # Używamy rglob do znalezienia wszystkich plików
    for f in target_dir.rglob("*"):
        if f.is_file():
            rel_path = f.relative_to(root_dir)
            
            # Sprawdź, czy jakakolwiek część ścieżki (folder nadrzędny) jest na liście ignorowanych
            # rel_path.parts rozbija ścieżkę na tuple, np. ('project', 'node_modules', 'package.json')
            path_parts = set(rel_path.parts)
            
            # Jeśli część wspólna zbiorów nie jest pusta, to znaczy, że plik jest w ignorowanym folderze
            if not path_parts.intersection(IGNORED_FOLDERS):
                files.append(str(rel_path))
    
    return "\n".join(files) if files else "No files found."


@tool
def write_to_file(filename: str, content: str):
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