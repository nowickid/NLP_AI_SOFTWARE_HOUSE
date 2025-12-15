from langchain.tools import tool
import os
from config import DOCS_DIR

@tool
def get_documentation(readme: bool, changelogs: bool):
    """
        Use this tool to retrieve the contents of project documentation.
    """
    contents = []
    if readme:
        readme_path = os.path.join(DOCS_DIR, "README.md")
        if os.path.exists(readme_path):
            with open(readme_path, "r", encoding="utf-8") as f:
                contents.append(f"--- README.md ---\n{f.read()}\n")
        else:
            contents.append("--- README.md ---\n(empty)\n")

    if changelogs:
        changelogs_path = os.path.join(DOCS_DIR, "changelogs.md")
        if os.path.exists(changelogs_path):
            with open(changelogs_path, "r", encoding="utf-8") as f:
                contents.append(f"--- changelogs.md ---\n{f.read()}\n")
        else:
            contents.append("--- changelogs.md ---\n(empty)\n")

    message = "\n".join(contents) if contents else "Documentation not found."
    return {
        "message": message
    }
