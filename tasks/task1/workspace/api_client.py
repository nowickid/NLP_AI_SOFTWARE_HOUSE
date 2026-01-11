import requests

def fetch_prices(asset_ids):
    """
    Fetches the current prices of specified assets from the CoinGecko API.

    Args:
        asset_ids (list): A list of asset IDs (e.g., ['bitcoin', 'ethereum']).

    Returns:
        dict: A dictionary mapping asset IDs to their price data, or None if an error occurs.
    """
    if not asset_ids:
        return {}

    ids_string = ",".join(asset_ids)
    url = f"https://api.coingecko.com/api/v3/simple/price"
    params = {
        'ids': ids_string,
        'vs_currencies': 'usd'
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from CoinGecko API: {e}")
        return None
