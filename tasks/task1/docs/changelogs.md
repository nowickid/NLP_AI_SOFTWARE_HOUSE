### Sprint 1: Core Functionality

-   **Project Structure**: Created the initial project structure with `main.py`, `api_client.py`, `database.py`, and `requirements.txt`.
-   **Database Module (`database.py`)**: Implemented `init_db` to create the SQLite database and `asset_prices` table. Implemented `add_price_record` to insert new asset prices with timestamps.
-   **API Client (`api_client.py`)**: Developed `fetch_prices` function to get real-time cryptocurrency data from the CoinGecko API.
-   **Main Application (`main.py`)**: Integrated the database and API modules to fetch, store, and display asset prices in a formatted console table using the `rich` library.
-   **Dependencies**: Created `requirements.txt` with `requests` and `rich` libraries.

### Sprint 2: Historical Data Feature

-   **Feature**: Implemented a `--history` command-line flag to display the last 10 historical price records.
-   **`database.py`**: Added the `get_historical_data` function to query the database for recent entries.
-   **`main.py`**: Integrated `argparse` to handle the new command-line flag and added conditional logic to display either live data or historical records.

