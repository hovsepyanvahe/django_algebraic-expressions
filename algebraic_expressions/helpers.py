import re


def custom_len(value):
    if isinstance(value, str):
        return len(value)
    else:
        raise TypeError("len() can only be applied to strings")


def custom_abs(value):
    if isinstance(value, int):
        return abs(value)
    else:
        raise TypeError("abs() can only be applied to integers")


def evaluate_expression(expression):
    operators = {'+': '+', '-': '-', '*': '*', '/': '/'}

    # To find and replace len() in the expression
    expression = re.sub(r'len\(\'(.*?)\'\)', lambda match: str(custom_len(match.group(1))), expression)

    # To find and replace abc() in the expression
    expression = re.sub(r'abs\((.*?)\)', lambda match: str(custom_abs(eval(match.group(1)))), expression)

    allowed_chars = set("0123456789+-*/ ()")
    if any(char not in allowed_chars for char in expression):
        return "Error: Invalid characters in the expression"

    try:
        result = eval(expression, {"__builtins__": None}, operators)

        if isinstance(result, (int, float)) and '/' in expression and result == float('inf'):
            return "Error: Division by zero"
        return result
    except Exception as e:
        return f"Error: {e}"
