# PitchWise Server

FastAPI backend application managed with [`uv`](https://docs.astral.sh/uv/).

## Folder Structure

```
server/
├── config/                  # Configuration files (YAML, JSON, or Prompts)
│   └── prompts.yaml         # LLM prompt templates
├── data/                    # Local data samples, artifacts, or vector cache
├── models/                  # AI/ML Model management weights or wrappers
│   └── __init__.py
├── src/                     # Core application source code
│   ├── __init__.py
│   ├── api/                 # Versioned API routes (HTTP layer)
│   │   ├── __init__.py
│   │   └── v1/
│   │       └── __init__.py
│   ├── core/                # Global infrastructure setups (config, logging)
│   │   └── __init__.py
│   ├── schemas/             # Pydantic data validation contracts
│   │   └── __init__.py
│   ├── services/            # Business Logic layer (Orchestration)
│   │   └── __init__.py
│   └── main.py              # FastAPI application entrypoint
├── pyproject.toml           # Project dependencies and uv configuration
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.12+
- [`uv`](https://github.com/astral-sh/uv)

### Run the Development Server

From within the `server/` directory:

```bash
uv run uvicorn src.main:app --reload --port 8000
```

Or using `uv run fastapi dev`:

```bash
uv run fastapi dev src/main.py
```

### Available Endpoints
- **Root**: `GET http://localhost:8000/`
- **Health Check**: `GET http://localhost:8000/health`
- **Prompt Templates**: `GET http://localhost:8000/api/prompts`
- **Interactive OpenAPI Docs**: `GET http://localhost:8000/docs`
