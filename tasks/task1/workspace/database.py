import sqlite3
from datetime import datetime

def init_db():
    """Initializes the database and creates the asset_prices table if it doesn't exist."""
    conn = sqlite3.connect('asset_tracker.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS asset_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id TEXT NOT NULL,
            price REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def add_price_record(asset_id, price):
    """Adds a new price record to the asset_prices table."""
    conn = sqlite3.connect('asset_tracker.db')
    cursor = conn.cursor()
    timestamp = datetime.now().isoformat()
    cursor.execute('''
        INSERT INTO asset_prices (asset_id, price, timestamp)
        VALUES (?, ?, ?)
    ''', (asset_id, price, timestamp))
    conn.commit()
    conn.close()

def get_historical_data(limit=10):
    """Retrieves a limited number of most recent asset price records."""
    conn = sqlite3.connect('asset_tracker.db')
    cursor = conn.cursor()
    cursor.execute('''
        SELECT asset_id, price, timestamp FROM asset_prices
        ORDER BY timestamp DESC
        LIMIT ?
    ''', (limit,))
    data = cursor.fetchall()
    conn.close()
    return data
