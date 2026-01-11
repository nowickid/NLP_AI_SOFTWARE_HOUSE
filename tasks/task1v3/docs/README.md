# Financial Asset Tracker

This console application tracks the real-time prices of financial assets like cryptocurrencies and stocks. It fetches data from public APIs, displays it in the terminal, and stores it in a local SQLite database.

## Features

-   Fetch real-time price data for predefined assets.
-   Display current asset prices in a formatted table.
-   Store historical price data in a local SQLite database.
-   View the last 10 historical records using a command-line flag.

## Architecture

The application is built using Python and consists of three main modules:

-   `main.py`: The entry point of the application. It handles command-line argument parsing and orchestrates the calls to the API and database modules.
-   `api.py`: Responsible for fetching data from the CoinGecko public API.
-   `database.py`: Manages all interactions with the SQLite database, including table creation, data insertion, and querying.

### Database Schema

The application uses a single table named `asset_prices` with the following structure:

-   `id`: INTEGER (Primary Key)
-   `asset_name`: TEXT
-   `price_usd`: REAL
-   `timestamp`: TIMESTAMP (Defaults to the current time of insertion)
