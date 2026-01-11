import argparse
from rich.console import Console
from rich.table import Table
from api_client import fetch_prices
from database import init_db, add_price_record, get_historical_data

ASSETS = ['bitcoin', 'ethereum', 'solana', 'dogecoin']

def main():
    parser = argparse.ArgumentParser(description="Track asset prices.")
    parser.add_argument('--history', action='store_true', help='Show the last 10 price records.')
    args = parser.parse_args()

    if args.history:
        records = get_historical_data(10)
        
        console = Console()
        table = Table(title="Historical Asset Prices (USD)")
        table.add_column("Asset", justify="right", style="cyan", no_wrap=True)
        table.add_column("Price", justify="right", style="magenta")
        table.add_column("Timestamp", justify="left", style="green")

        for record in records:
            asset, price, timestamp = record
            table.add_row(asset.capitalize(), f"${price:,.2f}", timestamp)
        
        console.print(table)
        return

    # Original logic if --history is not used
    init_db()
    
    prices = fetch_prices(ASSETS)
    
    if not prices:
        print("Could not fetch prices.")
        return

    console = Console()
    table = Table(title="Live Asset Prices (USD)")
    table.add_column("Asset", justify="right", style="cyan", no_wrap=True)
    table.add_column("Price", justify="right", style="magenta")

    for asset, data in prices.items():
        price = data.get('usd')
        if price is not None:
            add_price_record(asset, price)
            table.add_row(asset.capitalize(), f"${price:,.2f}")

    console.print(table)

if __name__ == "__main__":
    main()
