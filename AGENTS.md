# PitchWise — Agent Guidelines & Architecture Manual

Welcome to **PitchWise**. This document serves as the single source of truth for AI agents (and human engineers) working across this codebase.

---

## 1. Project Overview & Vision

**PitchWise** is an AI voice simulation and coaching platform built specifically for technical founders who struggle with customer discovery, qualification, and sales pitching.

### The Problem It Solves
Technical founders habitually jump straight into feature monologues and architectural explanations ("Let me show you our raft consensus algorithm...") rather than diagnosing business pain points. They frequently misinterpret polite brush-offs ("Looks cool, send me a deck") as validation and violate core customer discovery principles (e.g., *The Mom Test*).

### Core Product Capabilities
1. **Realistic Prospect Simulation:**
   - **Hidden Prospect Dossiers:** Prospects possess hidden background context, true pain points, and budget/authority constraints that are only revealed when the founder asks high-quality, open-ended diagnostic questions.
   - **Dynamic Attention & Patience Meter:** Monologues and pitch dumps drain prospect patience, triggering realistic pushback, interruptions, or polite brush-offs.
   - **Distinct Archetypes:** Skeptical engineering managers, busy enterprise executives with hard stops, pragmatic gatekeepers, and friendly prospects.
2. **Voice Interaction & Pacing:**
   - Real-time voice simulation with natural conversational pacing and barge-in / interruption handling.
3. **Structured Post-Call Scorecards & Debriefs:**
   - **Talk vs. Listen Ratio:** Target breakdown (e.g., ~30% talk, 70% listen).
   - **Discovery Framework Alignment:** Adherence to *The Mom Test*, SPIN Selling, and MEDDPICC methodologies.
   - **"Rewind & Replay" Coaching:** Specific timestamps showing what the prospect said, how the founder responded, and recommended rewrites.

---

## 2. Repository Layout & Architecture

PitchWise is structured as a monorepo containing a full-stack client, a Python backend, and OpenSpec specification artifacts.

---

## 3. Technology Stack & Key Conventions

| Area | Technologies | Version / Notes |
|---|---|---|
| **Frontend Framework** | React Router v7, React | React 19, `@react-router/dev` 8.5+, SSR enabled |
| **Frontend Tooling & Styling** | Vite, TypeScript, Tailwind CSS v4, shadcn/ui | Primary Theme: **`slate-900` & `white`** |
| **Backend Framework** | FastAPI, Uvicorn, Python | Python 3.12+, FastAPI 0.162+ |
| **Python Package Manager** | `uv` | Always use `uv` instead of raw `pip` or `pipenv` |
| **Authentication** | Supabase Auth (`@supabase/supabase-js`) | **Strictly modern API keys** (see rules below) |
| **Specification / Planning** | OpenSpec CLI (`openspec`) | `spec-driven` workflow |

---

## 4. Critical Engineering Rules & Guardrails

### 1. Supabase Authentication & Modern API Keys
- **NEVER use legacy Supabase keys:** Do not use `SUPABASE_ANON_KEY` or legacy static JWT keys.
- **Use Modern Supabase API Keys:**
  - Client URL: `VITE_SUPABASE_URL`
  - Client Publishable Key: `VITE_SUPABASE_PUBLISHABLE_KEY` (modern publishable key format, e.g., `sb_pub_...`)
  - Server Secret Key: `SUPABASE_SECRET_KEY` (if server-side admin access is needed)
- **Environment Variable Discipline:**
  - Code must declare and read environment variable keys cleanly.
  - Document all required keys with comments in `client/.env.example` or `server/.env.example`.
  - **Never hardcode real credentials or secrets into source code or git commits.** The user will populate their own `.env` values.
  - Provide graceful degradation or clear developer notices if `.env` keys are unconfigured (do not crash during initial startup).

### 2. Frontend Development Standards (`client/`)
- **UI Architecture & Component Library (shadcn/ui):**
  - Use **shadcn/ui** design patterns, accessibility primitives (Radix UI / modern headless patterns), and Lucide icons.
  - Implement reusable UI primitives in `client/app/components/ui/` with the standard `cn()` utility (`clsx` + `tailwind-merge`).
- **Project Theme & Palette (`slate-900` and `white`):**
  - The strict color theme for PitchWise is **`slate-900`** and **`white`**.
  - **Surfaces & Backgrounds:** Anchor layouts around `slate-900` (supported by `slate-950` for deep canvas and `slate-800` for cards/elevations) and crisp `white` for high-contrast light mode / container surfaces.
  - **Text & Accents:** High-contrast `white` and `slate-100` for primary typography, headers, and call-to-actions, with muted `slate-400` for secondary text.
  - **Borders & Dividers:** Subtle, crisp slate borders (`border-slate-800` or `border-slate-700`).
  - Maintain a sleek, distraction-free, high-contrast B2B SaaS aesthetic. Avoid distracting rainbow gradients or unaligned color schemes.
- **SSR Safety:** React Router runs with `ssr: true`. Ensure browser-only APIs (`window`, `localStorage`, `navigator`) are called within `useEffect` or client-only guards.
- **Type Safety:** Always verify changes with `npm run typecheck` (`react-router typegen && tsc`). Ensure zero TypeScript compiler errors.
- **Tailwind CSS v4:** Use modern Tailwind v4 syntax. Do not create legacy `tailwind.config.js` unless explicitly necessary.

### 3. Backend Development Standards (`server/`)
- **Use `uv` Exclusively:**
  - Run development server: `uv run uvicorn src.main:app --reload --port 8000` (or `uv run fastapi dev src/main.py`)
  - Add packages: `uv add <package>`
  - Run tests/tools: `uv run pytest`, `uv run ruff check`
- **Prompt Management:** All LLM system prompts, temperature defaults, and variables must be maintained in `server/config/prompts.yaml`, loaded dynamically rather than hardcoded in Python strings.
- **Layered Separation:** Route endpoints in `src/api/` should be thin and delegate execution to `src/services/`, using Pydantic schemas in `src/schemas/`.

### 4. OpenSpec Planning & Implementation Protocol
- When building features or significant architectural changes, follow the OpenSpec workflow:
  1. Explore: `/opsx-explore`
  2. Propose & Plan: `/opsx-propose <name>` (generates `proposal.md`, `specs/`, `design.md`, `tasks.md`)
  3. Validate: `openspec validate <name>`
  4. Implement: `/opsx-apply` (only start implementing when explicitly instructed)
- Preserve existing comments and docstrings unrelated to your changes.

---

## 5. Development Cheat Sheet

### Client (`client/`)
```bash
# Install dependencies
npm install

# Start Vite + React Router dev server (port 5173)
npm run dev

# Run TypeScript typechecks
npm run typecheck

# Production build
npm run build
```

### Server (`server/`)
```bash
# Run server with auto-reload (port 8000)
uv run uvicorn src.main:app --reload --port 8000

# Alternative FastAPI dev runner
uv run fastapi dev src/main.py

# Check API health
curl http://localhost:8000/health
```

### OpenSpec (`root/`)
```bash
# List active changes
openspec list

# Check change status
openspec status --change authentication

# Validate change artifacts
openspec validate authentication --strict
```

