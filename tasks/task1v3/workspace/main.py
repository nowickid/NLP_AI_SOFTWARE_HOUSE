import argparse
from tabulate import tabulate
import database
import api

def display_data(headers, data, title):
    """Displays data in a formatted table."""
    print(title)
    print(tabulate(data, headers=headers, tablefmt="grid"))

def main():
    """Main function to run the asset tracker."""
    parser = argparse.ArgumentParser(description="Financial Asset Tracker")
    parser.add_argument('--history', action='store_true', help='Display the last 10 historical entries.')
    args = parser.parse_args()

    database.setup_database()

    if args.history:
        historical_data = database.get_historical_data(10)
        headers = ["Timestamp", "Asset Name", "Price (USD)"]
        display_data(headers, historical_data, "Last 10 Historical Records")
    else:
        print("Fetching current asset prices...")
        asset_data = api.get_asset_prices()
        if asset_data:
            database.save_prices(asset_data)
            headers = ["Asset Name", "Price (USD)"]
            # Prepare data for display
            display_list = [[asset['name'], f"${asset['price']:,}"] for asset in asset_data]
            display_data(headers, display_list, "Current Asset Prices")
        else:
            print("Could not retrieve asset data.")

if __name__ == "__main__":
    main()
