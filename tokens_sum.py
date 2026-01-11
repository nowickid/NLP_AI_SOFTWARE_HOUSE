sum_data = {  
    "worker": { "input_tokens": 0, "output_tokens": 0, "api_calls": 0 },
    "menager": { "input_tokens": 0, "output_tokens": 0, "api_calls": 0 },
    "architect": { "input_tokens": 0, "output_tokens": 0, "api_calls": 0 },
    "summary": { "input_tokens": 0, "output_tokens": 0, "api_calls": 0 }
}

def get_token_counts():
    return sum_data["summary"]["input_tokens"], sum_data["summary"]["output_tokens"]

def get_sum():
    return sum_data

def accumulate_tokens(input_tokens: int, output_tokens: int, role: str):
    global sum_data
    role_lower = role.lower()

    if role_lower in sum_data:
        sum_data[role_lower]["input_tokens"] += input_tokens
        sum_data[role_lower]["output_tokens"] += output_tokens
        sum_data[role_lower]["api_calls"] += 1

    if role_lower != "summary":
        accumulate_tokens(input_tokens, output_tokens, "summary")