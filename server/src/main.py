from pathlib import Path
from typing import Any, Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yaml

app = FastAPI(
    title="PitchWise Server API",
    version="0.1.0",
    description="FastAPI backend application for PitchWise",
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONFIG_DIR = Path(__file__).resolve().parent.parent / "config"
PROMPTS_PATH = CONFIG_DIR / "prompts.yaml"


def load_prompts() -> Dict[str, Any]:
    """Load prompt templates from YAML configuration."""
    if PROMPTS_PATH.exists():
        with open(PROMPTS_PATH, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            return data.get("prompts", {}) if isinstance(data, dict) else {}
    return {}


@app.get("/")
def read_root():
    """Root status and discovery endpoint."""
    return {
        "name": "PitchWise API",
        "status": "online",
        "version": "0.1.0",
        "docs_url": "/docs",
    }


@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "ok"}


@app.get("/api/prompts")
def list_prompts():
    """List loaded prompt template definitions."""
    prompts = load_prompts()
    return {
        "count": len(prompts),
        "prompts": [
            {
                "id": key,
                "name": val.get("name", key),
                "description": val.get("description", ""),
                "variables": val.get("variables", []),
            }
            for key, val in prompts.items()
        ],
    }
