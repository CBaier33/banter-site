from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os
from execute import execute

app = FastAPI()

# Configuration
REPO_URL = "https://github.com/cbaier33/banter-lang"  # Replace with your repo URL
CLONE_DIR = "./banter-lang"  # Directory to clone the repo
VENV_DIR = "./venv"  # Directory for the virtual environment
REQUIREMENTS_FILE = "./requirements.txt"  # Path to requirements.txt in the current directory

# Ensure the latest version of the repo is available
def update_repo():
    if not os.path.exists(CLONE_DIR):
        subprocess.run(["git", "clone", REPO_URL, CLONE_DIR], check=True)
    else:
        subprocess.run(["git", "-C", CLONE_DIR, "pull"], check=True)

# Create and activate a virtual environment
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

@app.on_event("startup")
async def startup_event():
    try:
        update_repo()
        setup_virtual_environment()
        install_dependencies()
        print("Repository updated successfully.")
    except Exception as e:
        print(f"Failed to update repository: {e}")
        raise e

@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down server...")

# Define a Pydantic model for the input
class CodeInput(BaseModel):
    code: str

@app.post("/run")
async def run_code(input: CodeInput):
    try:
        # Run the interpreter as a subprocess, passing the code via stdin
        result = execute(input.code)

        if result is None:
            result = ""

        # Return the output from stdout
        return {"output": str(result)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

