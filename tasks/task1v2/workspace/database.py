
import sqlite3
from datetime import datetime, timezone

def init_db():
    """Initializes the database and creates the 'records' table if it doesn't exist."""
    conn = sqlite3.connect('assets.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset_id TEXT NOT NULL,
            price REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def add_record(asset_id, price):
    """
    Adds a new asset record to the database.

    Args:
        asset_id (str): The ID of the asset.
        price (float): The price of the asset.
    """
    conn = sqlite3.connect('assets.db')
    cursor = conn.cursor()
    timestamp = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute(
        "INSERT INTO records (asset_id, price, timestamp) VALUES (?, ?, ?)",
        (asset_id, price, timestamp)
    )
    conn.commit()
    conn.close()

def get_historical_data():
    """
    Retrieves the last 10 historical records from the database.

    Returns:
        list: A list of tuples, where each tuple represents a record.
    """
    conn = sqlite3.connect('assets.db')
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM records ORDER BY timestamp DESC LIMIT 10"
    )
    records = cursor.fetchall()
    conn.close()
    return records

if __name__ == '__main__':
    # Example usage:
    # Initialize the database
    init_db()
    
    # Add some dummy data
    add_record('BTC', 60000.0)
    add_record('ETH', 4000.0)
    
    # Retrieve and print historical data
    historical_data = get_historical_data()
    print("Historical Data:")
    for row in historical_data:
        print(row)
