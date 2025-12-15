_input_tokens = 0
_output_tokens = 0
_api_calls = 0

sum ={
    "worker": {
        "input_tokens": 0,
        "output_tokens": 0,
        "api_calls": 0
    },
    "menager": {
        "input_tokens": 0,
        "output_tokens": 0,
        "api_calls": 0
    },
    "architect": {
        "input_tokens": 0,
        "output_tokens": 0,
        "api_calls": 0
    }
}
def _accumulate_tokens(input_tokens: int, output_tokens: int, api_calls: int):
    global _input_tokens, _output_tokens, _api_calls
    _input_tokens += input_tokens
    _output_tokens += output_tokens
    _api_calls += api_calls

def get_token_counts():
    return _input_tokens, _output_tokens

def accumulate_tokens(input_tokens: int, output_tokens: int, role: str):
    global sum
    role_lower = role.lower()

    if role_lower in sum:
        sum[role_lower]["input_tokens"] += input_tokens
        sum[role_lower]["output_tokens"] += output_tokens
        sum[role_lower]["api_calls"] += 1


    _accumulate_tokens(input_tokens, output_tokens, 1)