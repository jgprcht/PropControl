# PropControl

Self-hosted property management and financial control platform for German landlords, investor groups, and small property managers.

This repository currently contains the **deployment foundation** for Milestone M001 / Slice S01:

- Minimal Next.js app shell (German UI, English code)
- Self-hosted Supabase stack via Docker Compose
- Ubuntu-focused installation and runbook

---

## Status

- **Milestone:** M001 — Foundation & Core Platform
- **Slice:** S01 — Ubuntu & Supabase Deployment Foundation
- **Scope of this repo state:**
  - Next.js (TypeScript) app with i18n and a basic shell UI
  - Docker Compose stack for app + Supabase (Postgres, Auth, REST, Storage)
  - Documentation for deploying on Ubuntu Server 22.04/24.04

> Functional domain modules (properties, tenants, expenses, financing, etc.) are not implemented yet. They are represented as structural placeholders only.

---

## Stack Overview

- **Frontend / App:**
  - Next.js (App Router), TypeScript, React
  - `react-intl` i18n layer
  - German UI (`de-DE`) / English code and schema

- **Platform Core:**
  - Supabase PostgreSQL
  - Supabase Auth (GoTrue)
  - Supabase REST (PostgREST)
  - Supabase Storage

- **Orchestration:**
  - Docker Compose
  - Target OS: Ubuntu Server 22.04 / 24.04 LTS

- **Architecture pattern:**
  - Core vs. Modules:
    - `app/src/core` — platform services and module registry
    - `app/src/modules/*` — placeholders for domain modules (Properties, Tenants, Expenses, Financing, Reporting, Utilities, Tax, Documents)

See `docs/architecture.md` for details.

---

## Repository Layout

- `app/` — Next.js application
  - `src/app/` — App Router pages and API routes
    - `page.tsx` — shell UI, i18n-driven, shows module registry
    - `api/health/route.ts` — health endpoint (`/api/health`)
  - `src/core/` — core platform (e.g. `moduleRegistry.ts`)
  - `src/modules/` — module placeholders
  - `src/i18n/` — i18n configuration and `de` translations
  - `Dockerfile` — app image build

- `infra/supabase/`
  - `docker-compose.supabase.yml` — trimmed Supabase stack (DB, Auth, REST, Storage)

- `docker-compose.yml` — top-level stack (app + Supabase services)

- `docs/`
  - `architecture.md` — architecture overview
  - `runbook.md` — operational runbook (install Docker, run stack, logs)
  - `install-ubuntu.md` — Ubuntu installation guide

- `.env.example` — environment variable template

- `CLAUDE.md` — agent instructions (stack, language rules, commands, DoD)

---

## Requirements & Language Rules

PropControl follows strict language and implementation rules defined in `prd-propcontrol-complete.md`:

- UI language: **German** (all user-facing text must come from i18n files).
- Technical language: **English** for:
  - Source code, schema, APIs, events
  - File and folder names
  - Comments, tests, commit messages

No inline UI strings are allowed; all UI copy must go through the i18n layer.

---

## Getting Started (Local / Dev)

### 1. Install dependencies (app)

```bash
cd app
npm install
```

### 2. Run the app without Docker (for development)

```bash
cd app
npm run dev
```

Then open:

```text
http://localhost:3000/
```

You should see:

- A German UI shell (title, subtitle, nav)
- A module list (Properties, Tenants, etc.) with enabled/disabled status
- A status pill indicating the system is running

The health endpoint is at:

```text
http://localhost:3000/api/health
```

---

## Running with Docker Compose (Full Stack)

> Requires Docker Engine + Docker Compose plugin. See `docs/runbook.md` for full instructions.

From the repository root:

1. Copy and edit env file:

```bash
cp .env.example .env
# then edit .env and set at least:
# POSTGRES_PASSWORD, JWT_SECRET, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, APP_BASE_URL
```

2. Build and start:

```bash
docker compose build
docker compose up -d
docker compose ps
```

3. Verify:

```bash
curl http://localhost:3000/api/health
# → {"status":"ok","version":"0.1.0"} (example)
```

And in a browser:

```text
http://<server-ip>:3000/
```

---

## Ubuntu Deployment

For a fresh Ubuntu Server 22.04/24.04:

- Follow `docs/install-ubuntu.md` for:
  - Docker installation
  - Cloning this repo
  - Configuring `.env`
  - Running `docker compose` to bring up the stack

---

## Roadmap (High Level)

This repo is driven by the Product Requirements Document:

- `prd-propcontrol-complete.md` — core product requirements
- `.gsd/milestones/M001` — milestone context and roadmap
- `.gsd/milestones/M001/slices/S01` — research and planning for this slice

Upcoming slices (beyond this foundation):

- S02 — Auth & Global Roles on self-hosted Supabase
- S03 — i18n infrastructure deepening & failure modes
- S04 — Properties & property memberships
- S05 — Invitation workflow
- S06 — Audit log core
- S07 — Backup & restore runbook and drills

---

## Contributing / Development Notes

- All new features must:
  - Respect the German UI / English code rule.
  - Be traceable to PRD requirement IDs.
  - Include tests and documentation updates once we move past the pure deployment foundation.
- Avoid introducing Supabase Cloud dependencies — this project is designed for self-hosted Supabase only.
- Domain modules should live under `app/src/modules/` and register themselves via the core module registry.

---
