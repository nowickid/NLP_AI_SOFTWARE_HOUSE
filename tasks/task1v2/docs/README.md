# Financial Asset Tracker

This console application tracks the real-time prices of financial assets like cryptocurrencies and stocks. It fetches data from public APIs, displays it in a formatted table, and stores the records in a local SQLite database.

## Features

-   Fetch real-time price data for specified assets.
-   Display data in a clean, formatted table in the terminal.
-   Store historical price data in a local SQLite database.
-   Retrieve and display the last 10 historical entries from the database.

## Architecture

-   **Language:** Python
-   **API:** CoinGecko for cryptocurrency data.
-   **Database:** SQLite for local data storage.
-   **Libraries:** `requests`, `argparse`, `sqlite3`

## Project Structure

```
.
├── main.py         # Main application script
├── api_client.py   # Handles API requests
├── database.py     # Manages the SQLite database
└── requirements.txt# Project dependencies
```
