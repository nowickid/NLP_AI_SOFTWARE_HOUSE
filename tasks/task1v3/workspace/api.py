import requests

# Note: CoinGecko API for stocks might be limited. We'll use IDs that work with the /simple/price endpoint.
# For this example, we'll stick to cryptocurrencies that are easily fetched.
# If you were to implement stocks, you'd likely need a different API endpoint or provider.
ASSET_IDS = ['bitcoin', 'ethereum', 'solana'] # Using crypto examples as they are reliable on this API.

def get_asset_prices():
    """Fetches the current prices for the predefined assets from CoinGecko."""
    ids = ','.join(ASSET_IDS)
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        # Format the data into a list of dictionaries
        formatted_data = [{'name': key, 'price': value['usd']} for key, value in data.items()]
        return formatted_data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return None
