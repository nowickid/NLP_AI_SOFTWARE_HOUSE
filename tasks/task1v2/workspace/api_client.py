import requests

def fetch_prices(asset_ids):
    """
    Fetches the current prices of specified assets from the CoinGecko API.

    Args:
        asset_ids (list): A list of asset IDs (e.g., ['bitcoin', 'ethereum']).

    Returns:
        dict: A dictionary containing the asset prices if the request is successful,
              otherwise None.
    """
    ids_string = ",".join(asset_ids)
    base_url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": ids_string,
        "vs_currencies": "usd"
    }

    try:
        response = requests.get(base_url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: Failed to fetch data. Status code: {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None
