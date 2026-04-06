# PropControl Architecture

## Overview

PropControl is a self-hosted web application for property management, built on:

- **Frontend / App Layer:** TypeScript, React, Next.js (App Router)
- **Platform Core:** Self-hosted Supabase (PostgreSQL, Auth, Storage)
- **Orchestration:** Docker Compose
- **Target Environment:** Ubuntu Server 22.04/24.04 LTS (and 24.04)

The system is designed as a **core platform + modules** architecture:

- The **core platform** handles authentication, users, roles, property memberships, audit logging, settings, and module registration.
- **Domain modules** (Properties, Tenants, Expenses, Financing, Reporting, Utilities Statement, Tax, Documents, etc.) plug into the core via explicit contracts.

For Milestone M001 / Slice S01, only the platform foundation and a minimal app shell are implemented. Domain modules remain placeholders.

## High-Level Components

### 1. Next.js App (PropControl Shell)

- Lives in the `app/` directory.
- Provides the HTTP entrypoint for users (browser clients) and for health checks.
- Uses Next.js App Router with TypeScript.
- UI language is German via an i18n layer; no inline UI text is allowed.
- Technical artifacts (code, file names, API routes) are in English.

Key responsibilities in S01:

- Serve a minimal German UI shell confirming the stack is running.
- Provide a `/api/health` endpoint for liveness checks.
- Establish initial folder structure for:
  - `core/` (platform services: auth, users, roles, memberships, audit, settings – mostly stubs in S01).
  - `modules/` (placeholders for domain modules such as `properties`, `expenses`, etc.).
  - `i18n/` (locale configuration and German translation files).

### 2. Supabase Stack (Self-Hosted)

- Runs via Docker Compose services based on the official `supabase/supabase` self-hosting configuration.
- Provides PostgreSQL, Auth (GoTrue), Storage, API gateway, and optional Studio.
- All data and authentication are controlled by the customer’s installation; there is no Supabase Cloud dependency.

Key responsibilities in S01:

- Provide a running PostgreSQL + Auth + Storage foundation for future slices.
- Persist data in Docker volumes on the Ubuntu host.
- Expose internal endpoints on a private Docker network; the app communicates with Supabase over this network.

### 3. Docker Compose Orchestration

- The repository root contains `docker-compose.yml` which:
  - Builds and runs the Next.js app container.
  - Runs Supabase services as containers.
  - Defines a shared network for inter-service communication.
  - Exposes the app via a host port (e.g. 3000) suitable for reverse proxying.

- Additional compose files under `infra/supabase/` encapsulate the Supabase-specific service configuration, closely tracking the official Supabase self-hosted stack.

## Core vs Modules Structure

Inside the `app/` project, the directory structure separates platform concerns (core) from domain modules:

- `app/core/`
  - Platform-level services and types (auth integration, user and role models, audit logging, settings, module registry).
  - These are designed to be reusable across all domain modules.

- `app/modules/`
  - Each business area (Properties, Tenants, Expenses, Financing, Reporting, Utilities, Tax, Documents) will live in its own subdirectory.
  - Modules will expose their own domain entities, API handlers, UI routes, and permissions.
  - Modules register themselves with the core module registry.

For S01, most of this is structural only: the directories and registry exist, but modules are not yet implemented.

## Deployment Topology (S01)

On a typical Ubuntu server, the deployment looks like this:

```text
+---------------------------+
|      Ubuntu Server        |
|   (22.04 / 24.04 LTS)     |
+---------------------------+
               |
        Docker Engine
               |
        docker compose
               |
    +-------------------+
    | Docker Network    |
    +-------------------+
      |              |
+-----------+   +----------------+
|  app      |   |  supabase-db   |
| (Next.js) |   |  supabase-auth |
|           |   |  supabase-api  |
|  :3000    |   |  supabase-...  |
+-----------+   +----------------+
      |
   Host Port (e.g. :3000 -> :80 later via reverse proxy)
```

- The app container listens on an internal port (default 3000) and is bound to a host port by Docker.
- Supabase components communicate with each other and with the app container on the internal Docker network.
- A reverse proxy (Nginx/Caddy/Traefik) is **not** part of S01 but can be configured later to terminate TLS and route HTTPS traffic to the app container.

## External Interfaces

- **Browser → App:**
  - HTTP requests to `/` (UI shell) and `/api/health`.
- **App → Supabase:**
  - HTTP/HTTPS requests to Supabase endpoints for Auth, storage, and data (to be wired in S02+).
- **Operator → Host:**
  - SSH access to the Ubuntu server to manage Docker (`docker compose up/down/ps`, backups, restores).

## Slice S01 Scope in Architecture

Slice S01 is limited to:

- Creating the base repository structure and Next.js app.
- Wiring Docker Compose for app + Supabase.
- Providing an i18n-configured German UI shell.
- Exposing a health endpoint.
- Documenting the install and run path for Ubuntu (see `docs/runbook.md`).

It does **not** yet implement:

- User authentication and global roles (S02).
- Property memberships and property-scoped roles (S04).
- Invitations (S05).
- Audit log behaviors (S06).
- Backup/restore automation beyond basic Docker volume semantics (S07).

These will be layered on top of the foundation defined here in subsequent slices.
