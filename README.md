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
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
├── docker-compose.yml
├── .env.example     # template – copy to .env
└── .env             # secrets – NOT in Git
```

## Prerequisites
- Docker Desktop (running)
- Git
- VS Code (or any IDE)

## How to run
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd careflow
   ```
2. Create your `.env` file from the template and fill in the Supabase values (get them privately from the team):
   ```bash
   cp .env.example .env
   ```
3. Build and start everything:
   ```bash
   docker compose up --build
   ```
4. Open the frontend: http://localhost:5173
   Backend health check: http://localhost:8000/health

To stop: `Ctrl+C`, then `docker compose down`.

## Git workflow (PR policy)
- Nobody pushes directly to `main`.
- Each member works in their own branch: `feature/<name>-<short-description>` (e.g. `feature/ori-list-appointments`).
- When done, open a Pull Request to `main`.
- At least **1 approval** is required before merge. The team leader (Matanel) approves PRs; Matanel's own PRs are approved by another member.
- Pull `main` before starting new work: `git checkout main && git pull`.

## Project management
Backlog, sprints and wiki are in Azure DevOps (project "Care Flow").
