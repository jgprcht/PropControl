# Ubuntu Installation Guide

This document describes how to deploy PropControl on a fresh Ubuntu Server using Docker Compose.

Target OS: **Ubuntu Server 22.04 LTS or 24.04 LTS**

> This guide assumes basic familiarity with Linux command line and SSH. All commands are intended to be run on the Ubuntu server as a user with `sudo` privileges.

## 1. Prepare the Server

1. Install Ubuntu Server 22.04/24.04 on your target machine or virtual machine.
2. Ensure you have network access and can SSH into the server.

Optional but recommended:

- Configure a static IP or DNS name for the server.
- Set up a firewall (e.g. UFW) allowing at least SSH (22) and HTTP (80/3000) for initial access.

## 2. Install Docker and Docker Compose Plugin

Follow the instructions in `docs/runbook.md` (section "Preparing an Ubuntu Host") to:

- Install Docker Engine.
- Install Docker Compose plugin.
- Verify both `docker` and `docker compose` commands are available.

## 3. Clone the Repository

```bash
mkdir -p ~/apps
cd ~/apps

git clone <REPO_URL> propcontrol
cd propcontrol
```

Replace `<REPO_URL>` with the actual Git repository URL.

## 4. Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set the required values:

   - Database password and user for Supabase Postgres
   - JWT secret and Supabase service keys
   - Application configuration (e.g. public Supabase URL, anon key)

> Do not commit `.env` to version control. It contains secrets specific to this installation.

## 5. Build and Start the Stack

From the repository root:

```bash
# Build containers
docker compose build

# Start services in the background
docker compose up -d
```

Check service status:

```bash
docker compose ps
```

All services should be `running` (and `healthy` where health checks are configured).

## 6. Verify the Installation

### 6.1. Health Endpoint

On the Ubuntu server:

```bash
curl http://localhost:3000/api/health
```

Expected JSON response (example):

```json
{"status":"ok","version":"0.1.0"}
```

### 6.2. Web UI

From your local machine, open a browser and navigate to:

```text
http://<server-ip>:3000/
```

You should see the PropControl shell UI rendered in German.

## 7. Managing the Stack

To view logs:

```bash
docker compose logs -f
```

To stop the stack:

```bash
docker compose down
```

To restart:

```bash
docker compose up -d
```

## 8. Next Steps

- Configure a reverse proxy (Nginx or Caddy) to provide HTTPS and user-friendly domains.
- Follow future documentation for backup and restore procedures (Slice S07).
- Implement authentication, roles, properties, and other modules in later milestones.
