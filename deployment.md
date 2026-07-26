# Deployment

**Live URL:** https://coffee-brew-log-akkt.onrender.com

---

## Deployment Method

This application is deployed on [Render](https://render.com) using **Docker**.

### Why Docker?

Render natively supports Node.js, Python, Ruby, Go, Rust, and Elixir. Java / Spring Boot requires Docker deployment on Render's platform.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Render Web Service (Docker)                                │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │  React Build    │  │  Spring Boot JAR              │  │
│  │  (static files) │  │  (REST API)                   │  │
│  │                 │  │                                 │  │
│  │  /              │  │  /api/brews                   │  │
│  │  /static/...    │  │  /api/brews/{id}              │  │
│  └─────────────────┘  └─────────────────────────────────┘  │
│           │                          │                      │
│           └──────────┬───────────────┘                      │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │  PostgreSQL    │                            │
│              │  (Render DB)   │                            │
│              └────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Dockerfile Overview

The `Dockerfile` uses a multi-stage build:

| Stage | Base Image | Purpose |
|-------|------------|---------|
| **1** | `node:18-alpine` | Build React frontend → outputs to `build/` |
| **2** | `maven:3.9-eclipse-temurin-17-alpine` | Build Spring Boot JAR, embedding React static files |
| **3** | `eclipse-temurin:17-jre-alpine` | Run the application with minimal footprint |

---

## Render Configuration

| Setting | Value |
|---------|-------|
| **Service Name** | `coffee-brew-log` |
| **Runtime** | Docker |
| **Branch** | `main` |
| **Root Directory** | *(repo root)* |
| **Dockerfile Path** | `./Dockerfile` |

### Environment Variables

| Key | Value | Source |
|-----|-------|--------|
| `DATABASE_URL` | `postgresql://...` | Render PostgreSQL dashboard → **Internal Database URL** |
| `FRONTEND_URL` | `https://coffee-brew-log-akkt.onrender.com` | Render Web Service URL |

> **Note:** Do **not** prefix `DATABASE_URL` with `jdbc:`. The `DataSourceConfig` class handles the conversion automatically.

---

## Deployment Steps

1. **Create PostgreSQL Database**
   - Render Dashboard → New → PostgreSQL
   - Name: `coffee-brew-db`
   - Region: Singapore (or closest to you)
   - Copy the **Internal Database URL**

2. **Create Web Service**
   - Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Runtime: **Docker**
   - Render auto-detects the `Dockerfile`

3. **Configure Environment Variables**
   - Add `DATABASE_URL` (from step 1)
   - Add `FRONTEND_URL` (your Render app URL)

4. **Deploy**
   - Render builds the Docker image (~5–10 minutes first time)
   - Spring Boot starts with `prod` profile
   - Application becomes available at your Render URL

---

## Build & Start Commands

Render uses the `Dockerfile` exclusively. No manual build/start commands are needed in the dashboard.

For reference, the Dockerfile executes:

```dockerfile
# Build
npm install && npm run build
cp -r build/* ../backend/src/main/resources/static/
./mvnw clean package -DskipTests

# Start
java -Dspring.profiles.active=prod -jar app.jar
```

---

## Troubleshooting Notes

| Issue | Cause | Fix |
|-------|-------|-----|
| `claims to not accept jdbcUrl` | `DATABASE_URL` has `jdbc:` prefix or credentials parsed incorrectly | Ensure env var starts with `postgresql://` (no `jdbc:`). The Java config class handles conversion. |
| Static files don't load | React build failed or wasn't copied | Check Render build logs for `npm run build` and `cp -r build/*` success |
| Database connection timeout | Wrong database URL or network issue | Verify `DATABASE_URL` matches the **Internal** URL (not External). Ensure database and web service are in the same region. |
| CORS errors in production | `FRONTEND_URL` mismatch | Update `FRONTEND_URL` to exactly match your Render domain |
| Port binding error | App not listening on `$PORT` | Spring Boot defaults to 8080. Render maps this automatically for Docker services. |

---

## Database Reset (Emergency)

If you need to reset the production database:

1. Go to Render PostgreSQL dashboard
2. Click **Reset** (this wipes all data)
3. Redeploy the web service to re-run `ddl-auto: update`

> ⚠️ **Warning:** This destroys all production data. Use only as a last resort.

---

## Post-Deployment Checklist

- [ ] App loads at the Render URL without errors
- [ ] Can create a new brew
- [ ] Can filter by method
- [ ] Can edit a brew
- [ ] Can delete a brew
- [ ] Page title updates with brew count
- [ ] Mobile layout is responsive
- [ ] `Documentation.md` and `deployment.md` are up to date in the repo
