## Sprint 1: Initial Implementation

**Sprint Goal:** Create a fully functional console application for tracking financial assets with API integration, database storage, and command-line interface.

### Changes:
-   **Project Structure:** Created the initial project structure with `main.py`, `api_client.py`, `database.py`, and `requirements.txt`.
-   **Database Module:** Implemented `database.py` to create and manage an SQLite database (`assets.db`), handle record insertion, and retrieve the last 10 historical records.
-   **API Client:** Implemented `api_client.py` to fetch real-time asset prices from the CoinGecko API, including basic error handling.
-   **Command-Line Interface:** Developed the main application logic in `main.py` using the `argparse` library to handle two modes:
    -   Fetching current prices for specified assets (e.g., `python main.py bitcoin`).
    -   Viewing the last 10 historical entries using the `--history` flag.
-   **Dependencies:** Added the `requests` library to `requirements.txt`.
-   **Verification:** Confirmed that the application successfully fetches data, stores it in the database, and displays both real-time and historical data as formatted tables in the console.


