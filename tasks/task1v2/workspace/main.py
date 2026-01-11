import argparse
from api_client import fetch_prices
from database import init_db, add_record, get_historical_data

def main():
    """
    Main function to handle command-line arguments and orchestrate the application logic.
    """
    # Ensure the database is initialized before any operations
    init_db()

    # Set up the argument parser
    parser = argparse.ArgumentParser(
        description="A command-line tool to track financial asset prices."
    )
    parser.add_argument(
        'asset_ids',
        nargs='*',
        default=[],
        help="One or more asset IDs (e.g., bitcoin, ethereum) to fetch the current price for."
    )
    parser.add_argument(
        '--history',
        action='store_true',
        help="Display the last 10 price records from the database."
    )

    args = parser.parse_args()

    if args.history:
        # --- History Mode ---
        records = get_historical_data()
        if not records:
            print("No historical data found.")
            return

        print("\n--- Price History (Last 10 Records) ---")
        print("─" * 60)
        print(f"{'ID':<5} {'Asset':<15} {'Price (USD)':<15} {'Timestamp':<25}")
        print("─" * 60)
        for row in records:
            # Unpack the tuple for clarity
            record_id, asset_id, price, timestamp = row
            print(f"{record_id:<5} {asset_id:<15} {price:<15.2f} {timestamp:<25}")
        print("─" * 60)

    elif args.asset_ids:
        # --- Default Mode (Fetching Prices) ---
        asset_ids = args.asset_ids
        price_data = fetch_prices(asset_ids)

        if price_data:
            print("\n--- Current Asset Prices ---")
            print("─" * 40)
            print(f"{'Asset':<20} {'Price (USD)':<20}")
            print("─" * 40)
            for asset, data in price_data.items():
                price = data.get('usd')
                if price is not None:
                    # Add the new record to the database
                    add_record(asset, price)
                    print(f"{asset:<20} {price:<20.2f}")
            print("─" * 40)
        else:
            print("Could not fetch price data. Please check the asset IDs and your connection.")

    else:
        # --- No Arguments Provided ---
        print("No asset IDs provided. Use '--history' to see past records or provide asset IDs.")
        parser.print_help()

if __name__ == "__main__":
    main()
