# PropControl Runbook

## 1. Preparing an Ubuntu Host

Target OS: **Ubuntu Server 22.04 LTS or 24.04 LTS**

### 1.1. System Requirements (Baseline)

- 2 vCPU or more (4 recommended)
- 4 GB RAM minimum (8 GB recommended for Supabase + app)
- 40 GB disk space minimum (more for production data)
- Outbound internet access to pull Docker images

### 1.2. Install Docker Engine and Docker Compose Plugin

Run the following commands as a user with `sudo` privileges.

```bash
# Update package index
sudo apt-get update

# Install prerequisite packages
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker’s official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Compose plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Optional: allow current user to run Docker without sudo
sudo usermod -aG docker "$USER"
# Log out and log back in for group changes to take effect
```

Verify installation:

```bash
docker --version
docker compose version
```

## 2. Cloning the Repository

```bash
# Choose an installation directory, e.g.
mkdir -p ~/apps
cd ~/apps

# Clone the PropControl repository
git clone <REPO_URL> propcontrol
cd propcontrol
```

> Replace `<REPO_URL>` with the actual repository URL.

## 3. Environment Configuration

PropControl and Supabase are configured via environment variables.

### 3.1. Create `.env` from Template

From the repository root:

```bash
cp .env.example .env
```

Open `.env` in an editor and set at least the required secrets:

- Database password
- JWT secret
- Supabase API keys
- App configuration values

The exact variables and required values are documented inline in `.env.example` and in comments within this runbook once they are fully defined.

> Never commit `.env` to version control. It is specific to each installation and contains secrets.

## 4. First Run (Docker Compose)

From the repository root:

```bash
# Build all images (app + Supabase-related services)
docker compose build

# Start the stack in detached mode
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

All services should show as `running` (and `healthy` where health checks are configured).

### 4.1. Verify the App is Running

On the Ubuntu server:

```bash
curl http://localhost:3000/api/health
```

Expected response (example):

```json
{"status":"ok","version":"0.1.0"}
```

From your workstation browser, open:

```text
http://<server-ip>:3000/
```

You should see the PropControl shell UI rendered in German.

## 5. Stopping and Restarting the Stack

Stop containers but keep volumes and images:

```bash
docker compose down
```

Restart:

```bash
docker compose up -d
```

## 6. Logs and Basic Troubleshooting

View logs for all services:

```bash
docker compose logs -f
```

View logs for a single service (example `app`):

```bash
docker compose logs -f app
```

Common issues:

- **Port already in use**: Another process is listening on the app port (default 3000). Either stop that process or change the host port mapping in `docker-compose.yml`.
- **Database connection errors**: Check that Supabase database service is running and that the connection env vars in `.env` match the Supabase configuration.
- **Env var misconfiguration**: If the app fails to start, verify that required variables are present in `.env`.

## 7. Data Persistence

Supabase PostgreSQL and other stateful components use Docker volumes for data persistence. These volumes are created automatically when the stack is started.

To list volumes:

```bash
docker volume ls
```

Do **not** remove volumes unless you intend to delete all data.

Backup and restore procedures for database and storage will be detailed in a dedicated section and runbook as part of a later slice (S07).

## 8. Reverse Proxy and TLS (Future)

For Slice S01, PropControl is exposed directly via the app container port (e.g. `:3000`). In production, a reverse proxy (such as Nginx or Caddy) should be used to:

- Terminate TLS (HTTPS)
- Serve on standard ports 80/443
- Forward traffic to the app container

Sample reverse proxy configuration and TLS guidance will be added in a later slice focused on hardening and operations.
