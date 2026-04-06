# PropControl — Agent Instructions

## Stack

- Frontend: TypeScript, React, Next.js (App Router)
- Backend/app layer: TypeScript within the Next.js app (API routes)
- Database & platform: Self-hosted Supabase (PostgreSQL, Auth, Storage) via Docker Compose
- Deployment target: Ubuntu Server 22.04/24.04 LTS
- Orchestration: Docker Compose

## Language Rules

- UI language: **German only** (`de-DE`). All user-facing text must come from i18n translation files.
- Technical language: **English only** for:
  - source code, folders, files
  - database schema, migrations
  - APIs, events
  - comments, tests, commit messages
- No inline UI strings: never hardcode German into components; always use the i18n layer.
- Missing translations must fail loudly in development (log or throw) so they can be fixed.

## Commands

These are the expected commands once the stack is fully wired:

- Install app dependencies:
  - `cd app`
  - `npm install`
- Run app locally (without Docker):
  - `cd app`
  - `npm run dev`
- Build app:
  - `cd app`
  - `npm run build`
- Run app tests (to be added per slice):
  - `cd app`
  - `npm test`
- Docker Compose (from repo root):
  - `docker compose build`
  - `docker compose up -d`
  - `docker compose ps`

_Exact scripts and test commands will be updated as they are implemented._

## Migrations & Database

- Supabase PostgreSQL is the primary database.
- For now, application-level migrations beyond Supabase’s own schema are deferred to later slices.
- When adding domain tables, use SQL migrations (or Supabase migration tools) with English table/column names.

## Requirements & Traceability

- Requirements are defined in `prd-propcontrol-complete.md` and `.gsd/REQUIREMENTS.md`.
- Each substantive feature or behavior must map back to at least one requirement ID (e.g. R001, R002, R007, R008, R-DEP-001–004).
- When implementing a feature, include requirement IDs in:
  - PR/commit descriptions (for humans), and
  - Documentation updates (e.g. in `docs/requirements.md` once created).

## Definition of Done (Repository Level)

A feature is only done when:

- Code is implemented.
- Tests exist and pass (for non-trivial logic; initial deployment wiring may have smoke tests only).
- Migrations are included if the data model changed.
- Documentation is updated (architecture, runbook, or requirements docs).
- UI texts are in German via i18n.
- Technical code, schema, and tests are in English.
- No `TODO` or stub placeholders remain in production paths.

## Slice S01 Focus (Ubuntu & Supabase Deployment Foundation)

For Slice S01 specifically:

- Deliver a working Docker Compose stack that runs:
  - Supabase (self-hosted) services.
  - A minimal Next.js-based PropControl shell app.
- The app must:
  - Be reachable via HTTP on the host when using `docker compose up` on Ubuntu.
  - Expose a simple health endpoint (`/api/health`).
  - Render a basic German UI shell using i18n (no inline strings).
- Provide initial deployment documentation for Ubuntu (Docker install, env file, basic runbook).

## Working Style

- Prefer small, reviewable changes that correspond to individual requirements or sub-features.
- Use clear, explicit error messages and logs (English) where needed — but never log secrets.
- Keep the core vs. modules boundary clear in the app structure (core platform vs. domain modules).
