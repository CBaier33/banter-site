from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager

import subprocess
import os
import sys

# Configuration
REPO_URL = "https://github.com/cbaier33/banter-lang"
CLONE_DIR = "./banter-lang"
VENV_DIR = "./venv"
REQUIREMENTS_FILE = "./requirements.txt"

# Ensure the latest version of the repo is available
def update_repo():
    if not os.path.exists(CLONE_DIR):
        subprocess.run(["git", "clone", REPO_URL, CLONE_DIR], check=True)
    else:
        subprocess.run(["git", "-C", CLONE_DIR, "pull"], check=True)

def setup_virtual_environment():
    if not os.path.exists(VENV_DIR):
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", VENV_DIR], check=True)

# Install dependencies in the virtual environment
def install_dependencies():
    if os.path.exists(REQUIREMENTS_FILE):
        print("Installing dependencies from requirements.txt into the virtual environment...")
        pip_executable = os.path.join(VENV_DIR, "bin", "pip") if os.name != "nt" else os.path.join(VENV_DIR, "Scripts", "pip.exe")
        subprocess.run([pip_executable, "install", "-r", REQUIREMENTS_FILE], check=True)

def load_executor():
    sys.path.insert(0, CLONE_DIR)
    try:
        from execute import execute  
        return execute
    except ImportError as e:
        raise ImportError(f"Failed to import execute function: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        update_repo()
        setup_virtual_environment()
        install_dependencies()
        load_executor()
        print("Repository updated successfully.")
        yield  # Server runs while this is active
    finally:
        print("Shutting down server...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://localhost:4200", "https://banter-lang.org", "https://www.banter-lang.org"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for the input
class CodeInput(BaseModel):
    code: str


@app.post("/run")
async def run_code(input: CodeInput):
    try:
        # Run the interpreter as a subprocess, passing the code via stdin
        from execute import execute
        result = execute(input.code)

        if result is None:
            result = ""

        # Return the output from stdout
        return {"output": str(result)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
