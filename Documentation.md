# Brew'd — Coffee Brew Log

A full-stack application for logging and tracking coffee brews. Built with **Spring Boot**, **React**, **Tailwind CSS**, and **PostgreSQL**.

> ☕ *Grab your favorite brew, broer!*

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Create, Read, Update, Delete** brew entries
- **Filter** brew log by brewing method (V60, French Press, Espresso, Aeropress, Chemex, Moka Pot, Cold Brew)
- **Form validation** on both frontend and backend
- **Responsive design** optimized for mobile and desktop
- **Dynamic page title** showing current brew count
- **Playful, modern UI** with custom SVG icons and smooth interactions

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Java 17, Spring Boot 3, Spring Data JPA, Hibernate Validator |
| **Frontend** | React 18, Tailwind CSS 3, Axios |
| **Database** | H2 (development), PostgreSQL (production) |
| **Build Tool** | Maven |
| **Deployment** | Docker, Render |

---

## Project Structure

```
full-stack-developer-bootcamp-Olebogeng-Raphesu/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/com/coffeebrew/
│   │   ├── CoffeeBrewLogApplication.java
│   │   ├── config/
│   │   │   └── DataSourceConfig.java     # Production DB config
│   │   ├── controller/
│   │   │   └── BrewController.java       # REST endpoints
│   │   ├── entity/
│   │   │   └── Brew.java                 # JPA entity
│   │   ├── exception/
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/
│   │   │   └── BrewRepository.java
│   │   └── service/
│   │       └── BrewService.java
│   ├── src/main/resources/
│   │   ├── application.yml               # Profile-based config
│   │   └── static/                       # React production build
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/                         # React single-page application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrewForm.js
│   │   │   └── BrewList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── .env.example                      # Environment variable template
├── .gitignore
├── Documentation.md                  # This file
└── deployment.md                     # Live deployment notes
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Java 17+](https://adoptium.net/)
- [Node.js 18+](https://nodejs.org/)
- [Maven](https://maven.apache.org/) (or use the included `./mvnw` wrapper)
- [Git](https://git-scm.com/)

> **Tip:** For local development, you do **not** need to install PostgreSQL. The app uses an embedded H2 database in development mode.

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Umuzi-classroom/full-stack-developer-bootcamp-Olebogeng-Raphesu.git
cd full-stack-developer-bootcamp-Olebogeng-Raphesu
```

### 2. Start the Backend

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

The API will be available at: **http://localhost:8080**

> **Windows users:** Use `.\mvnw spring-boot:run` instead of `./mvnw`.

### 3. Start the Frontend

In a new terminal window:

```bash
cd frontend
npm install
npm start
```

The app will open at: **http://localhost:3000**

### 4. Verify Everything Works

1. Open http://localhost:3000 in your browser
2. Click **+** to add a new brew
3. Try filtering by method
4. Edit and delete entries

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Local Development

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:8080/api` |

### Production (Render)

| Variable | Description | Source |
|----------|-------------|--------|
| `DATABASE_URL` | PostgreSQL connection string | Render PostgreSQL dashboard → Internal Database URL |
| `FRONTEND_URL` | Public URL of deployed app | Render Web Service dashboard |

> **Important:** Do **not** commit `.env` files. They are already listed in `.gitignore`.

---

## API Reference

### Base URL

- Local: `http://localhost:8080/api`
- Production: `https://your-app.onrender.com/api`

### Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/brews` | List all brews | `method` — optional filter by brew method |
| `GET` | `/brews/{id}` | Get a single brew by ID | — |
| `POST` | `/brews` | Create a new brew | — |
| `PUT` | `/brews/{id}` | Update an existing brew | — |
| `DELETE` | `/brews/{id}` | Delete a brew | — |

### Request Body (POST / PUT)

```json
{
  "beanName": "Ethiopian Yirgacheffe",
  "brewMethod": "V60",
  "grindSize": "Medium-Fine",
  "waterTemp": 93,
  "brewTime": "3:30",
  "notes": "Floral aroma with bright citrus acidity."
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `beanName` | Required, non-blank | "Bean name is required" |
| `brewMethod` | Required, non-blank | "Brew method is required" |
| `grindSize` | Required, non-blank | "Grind size is required" |
| `waterTemp` | Required, not null | "Water temperature is required" |
| `brewTime` | Required, non-blank | "Brew time is required" |

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200 OK` | Successful GET or PUT |
| `201 Created` | Successful POST |
| `204 No Content` | Successful DELETE |
| `400 Bad Request` | Validation failed |
| `404 Not Found` | Brew ID does not exist |

---

## Deployment

See [`deployment.md`](./deployment.md) for detailed deployment instructions and the live application URL.

---

## Troubleshooting

### Backend won't start

**Problem:** `Port 8080 is already in use`

**Solution:**
```bash
# Find and kill the process using port 8080
# macOS / Linux:
lsof -ti:8080 | xargs kill -9

# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

### Frontend shows "Failed to fetch brews"

**Problem:** CORS error or backend not running

**Solution:**
1. Ensure the backend is running on port 8080
2. Check that `REACT_APP_API_URL` in `frontend/.env` points to `http://localhost:8080/api`
3. For local dev, ensure `@CrossOrigin` allows your frontend port (3000 or 3001)

### Database connection fails on Render

**Problem:** `claims to not accept jdbcUrl`

**Solution:** The `DataSourceConfig` class automatically converts Render's `postgresql://` URLs to JDBC format. Ensure your `DATABASE_URL` starts with `postgresql://` (not `jdbc:`) in the Render dashboard.

### React build fails with Tailwind error

**Problem:** `It looks like you're trying to use tailwindcss directly as a PostCSS plugin`

**Solution:** This project uses **Tailwind CSS v3**. If you installed v4, downgrade:
```bash
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

---

## License

This project was built as part of the Umuzi Full-Stack Developer Bootcamp.

---

<p align="center">Made with ☕ and code</p>
