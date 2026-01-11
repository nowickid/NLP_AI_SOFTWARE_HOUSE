import sqlite3

DB_NAME = 'asset_tracker.db'

def setup_database():
    """Creates the database and the asset_prices table if they don't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS asset_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_name TEXT NOT NULL,
            price_usd REAL NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def save_prices(asset_data):
    """Saves a list of asset data to the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    for asset in asset_data:
        cursor.execute("INSERT INTO asset_prices (asset_name, price_usd) VALUES (?, ?)", (asset['name'], asset['price']))
    conn.commit()
    conn.close()

def get_historical_data(limit=10):
    """Retrieves the last N historical records from the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT timestamp, asset_name, price_usd FROM asset_prices ORDER BY timestamp DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    return rows
