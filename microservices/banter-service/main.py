from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/eval-banter")
async def read_input(file: str):
    pass
    ## TODO
    ## pass file to banter intepreter and return output
    ## add restraints for time and length of output?
