# Financial Asset Tracker

This console application tracks the real-time prices of financial assets like stocks and cryptocurrencies.

## Project Overview

The application fetches live price data from public APIs, displays it in a formatted table in the terminal, and logs the data in a local SQLite database. It also provides a command-line option to view historical data.

## Architecture

The application is structured into three main components:

1.  **`main.py`**: The entry point of the application. It handles command-line arguments, orchestrates the data fetching and storage process, and displays the data.
2.  **`api_client.py`**: A module responsible for interacting with the external financial data API (e.g., CoinGecko). It fetches the real-time prices for a predefined list of assets.
3.  **`database.py`**: This module manages all database operations. It uses SQLite to store and retrieve asset price data. It handles table creation, data insertion, and querying for historical records.

## Features

-   Real-time price fetching for specified cryptocurrencies.
-   Display of current asset prices in a clean, formatted table.
-   Storage of price data with timestamps in a local SQLite database.
-   A command-line flag (`--history`) to retrieve and display the last 10 recorded entries.

## Setup and Usage

1.  **Installation**:
    ```bash
    pip install -r requirements.txt
    ```
2.  **Running the application**:
    -   To fetch and display live data:
        ```bash
        python main.py
        ```
    -   To view the last 10 historical records:
        ```bash
        python main.py --history
        ```
