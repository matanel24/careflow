# CareFlow – Clinic Management System

Software Engineering project 5787 (2026–27).
Team: Matanel Zaltsman, Evyatar Refua, Ori Pinto, Noam Ziv Hason.

CareFlow manages a network of clinics: appointments and reception, patient records and prescriptions, pharmacy and inventory, staff and billing, and an AI assistant for the clinic.

## Tech stack
- **Frontend:** React (Vite)
- **Backend:** Python (FastAPI)
- **Database:** Supabase (shared cloud PostgreSQL)
- **Run:** Docker + Docker Compose

## Project structure
```
careflow/
├── frontend/              React (Vite) – start screen
│   ├── src/
│   └── Dockerfile
├── backend/               Python (FastAPI) – API server
│   ├── main.py            app + CORS + router registration
│   ├── db.py              shared Supabase connection: get_supabase()
│   ├── routers/           one file per feature (e.g. ai_requests.py)
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml     runs frontend + backend together
├── .env.example           template – copy to .env
└── .env                   secrets – NOT in Git (each member keeps their own)
```

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) – installed and **running**
- [Git](https://git-scm.com/downloads)
- VS Code (or any IDE)

## How to run
1. Clone the repository (first time only):
   ```bash
   git clone https://github.com/matanel24/careflow.git
   cd careflow
   ```
   Already cloned? Get the latest code:
   ```bash
   git checkout main
   git pull
   ```
2. Create your `.env` file from the template, and fill in the Supabase values (get them privately from the team – never commit them):
   ```bash
   cp .env.example .env
   ```
   (Windows PowerShell: `copy .env.example .env`)
   Without `.env` the app still starts, but database requests return `503 Database is not configured`.
3. Build and start everything:
   ```bash
   docker compose up --build
   ```
   The first build takes a few minutes. It is ready when you see `VITE ... ready` and `Application startup complete`.
4. Open:
   - Frontend: http://localhost:5173 – shows "CareFlow" and the server status `{"status":"ok"}`
   - Backend health check: http://localhost:8000/health
   - API docs (all endpoints, try them live): http://localhost:8000/docs

To stop: `Ctrl+C`, then `docker compose down`.
After changing `requirements.txt` or `package.json`, rebuild: `docker compose up --build -V`.

## API endpoints
| Method | Path | Description | Owner |
|---|---|---|---|
| GET | `/health` | Server status | Noam |
| POST | `/ai-requests` | Save a question for the clinic AI assistant | Matanel |
| GET | `/ai-requests` | Latest saved questions | Matanel |
| GET | `/appointments` | List appointments sorted by appointment_time | Ori |
| GET | `/medications` | List medication inventory sorted by name (low stock shown in red) | Evyatar |
## Adding a new endpoint
1. Create `backend/routers/<feature>.py` with an `APIRouter`.
2. Use `get_supabase()` from `db.py` to read/write the database.
3. In `main.py` add `from routers import <feature>` and `app.include_router(<feature>.router)`.
4. Add a row to the API endpoints table above.

## Git workflow (PR policy)
- Nobody pushes directly to `main`.
- Each member works in their own branch: `feature/<name>-<short-description>` (e.g. `feature/ori-list-appointments`).
- When done, open a Pull Request to `main`.
- At least **1 approval** is required before merge. The team leader (Matanel) approves PRs; Matanel's own PRs are approved by another member.
- Pull `main` before starting new work: `git checkout main && git pull`.

## Project management
Backlog, sprints and wiki are in Azure DevOps (project "Care Flow").
