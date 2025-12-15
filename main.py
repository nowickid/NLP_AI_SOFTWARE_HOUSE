from software_house.software_house import run_software_house
from config import WORKSPACE_DIR, DOCS_DIR
from dotenv import load_dotenv
from tokens_sum import get_token_counts
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(message)s',
    datefmt='%H:%M:%S'
)

if __name__ == "__main__":
    if not os.path.exists(WORKSPACE_DIR):
        os.makedirs(WORKSPACE_DIR)
    if not os.path.exists(DOCS_DIR):
        os.makedirs(DOCS_DIR)

    run_software_house("Create a todo list application with modern UI.")
    input_tokens, output_tokens = get_token_counts()

    logging.info("Software House run completed.")
    logging.info("  Total input tokens: %d", input_tokens)
    logging.info("  Total output tokens: %d", output_tokens)
