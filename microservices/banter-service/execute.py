import sys
sys.path.append("./banter-lang")

from collections import deque
from banterlang import parser
from interpreter import eval_program
from banter import concrete2abstract

variables = {}
context = []

def execute(input_str: str) -> str:

    try:
        input_str = input_str.replace("\r\n", "\n").replace("\r", "\n").strip()
        ast = concrete2abstract(input_str, parser)
        if ast is None:
            return "Invalid Input."
        
        if isinstance(ast, list):
            program = ast
        else:
            program = [ast]

        try:
            if not context:
                context.insert(0, program)
                
            result = eval_program(program, variables, context, returnPrints=True)
            return result

        except Exception as e:
            return f"Execution Error: {str(e)}"


    except Exeception as e:
        return f"Error: {str(e)}"
