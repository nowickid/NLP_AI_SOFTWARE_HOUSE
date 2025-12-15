from utils import list_files, write_to_file, read_file
from config import WORKSPACE_DIR
import subprocess
from langchain.tools import tool
import os
import shlex
import time
import logging
from pathlib import Path

BG_PID_FILE = "background_pids.txt"
logger = logging.getLogger(__name__)

@tool
def execute_command(command: str):
    """Executes a shell command in the workspace directory and returns the output."""
    logger.info(f"      Executing command: '{command}'")
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=WORKSPACE_DIR, 
            capture_output=True, 
            text=True, 
            timeout=30 
        )

        output = result.stdout
        if result.stderr:
            output += f"\n[STDERR]: {result.stderr}"
        
        return f"Result of executing '{command}':\n {output if output.strip() else '(No output)'}"
        
    except Exception as e:
        return f"Error while executing command: {str(e)}"
        

@tool
def execute_background(command: str):
    """
    Executes a shell command in the background within the workspace directory.
    """
    logger.info(f"      Starting background command: '{command}'")
    try:
        proc = subprocess.Popen(
            shlex.split(command),
            cwd=WORKSPACE_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        time.sleep(15)
        ret = proc.poll()

        if ret is not None:
            stdout, stderr = proc.communicate()
            
            return f"Error:\n Exit code: {ret}\n STDOUT: {stdout.decode()}\n STDERR:\n{stderr.decode()}"
            

        with open(os.path.join(BG_PID_FILE), "a") as f:
            f.write(str(proc.pid) + "\n")

        return  f"Process started in background successfully. PID={proc.pid}"

    except Exception as e:
        return  f"Error execute_background: {str(e)}"
    
@tool
def delete_file(file_path: str):
    """Deletes a file at the specified path within the workspace directory."""
    logger.info(f"      Deleting file: '{file_path}'")
    root_dir = Path(WORKSPACE_DIR).resolve()
    target_file = (root_dir / file_path).resolve()

    if not target_file.is_relative_to(root_dir):
        return f"Error: Unauthorized access to path '{file_path}'."
    if not target_file.exists():
        return f"Error: The specified file '{file_path}' does not exist."
    target_file.unlink()
    return f"Successfully deleted file '{file_path}'."
    
    
def kill_background_processes():
    if not os.path.exists(BG_PID_FILE):
        return "No background processes to kill."

    with open(BG_PID_FILE, "r") as f:
        pids = f.readlines()

    for pid_str in pids:
        pid = pid_str.strip()
        if pid.isdigit():
            try:
                os.kill(int(pid), 9) 
            except Exception as e:
                print(f"Error killing PID {pid}: {str(e)}")

    os.remove(BG_PID_FILE)

tools = [list_files, write_to_file, read_file, execute_command, execute_background, delete_file]