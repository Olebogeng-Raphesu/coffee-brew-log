# Deployment

**Live URL**: https://coffee-brew-log.onrender.com

## Deployment Method
Deployed on Render using Docker.

## Why Docker?
Render natively supports Node.js, Python, Ruby, Go, Rust, and Elixir.  
Java/Spring Boot requires Docker deployment on Render.

## Dockerfile Overview
- **Stage 1**: Builds React frontend with Node.js
- **Stage 2**: Builds Spring Boot JAR with Maven, embedding React static files
- **Stage 3**: Runs the JAR with Eclipse Temurin JRE 17

## Render Configuration
| Setting | Value |
|---------|-------|
| Runtime | Docker |
| Branch | main |
| Environment Variables | `DATABASE_URL`, `FRONTEND_URL` |

## Environment Variables
- `DATABASE_URL`: Internal URL of Render PostgreSQL database
- `FRONTEND_URL`: Public URL of the deployed Render service

## Troubleshooting Notes
- If build fails: Check that `backend/pom.xml` exists and artifactId matches the expected JAR name
- If static files don't load: Verify React build output is copied to `backend/src/main/resources/static/`
- If database connection fails: Verify `DATABASE_URL` is set and PostgreSQL dialect is active in `prod` profile