# Coffee Brew Log

A full-stack application for logging coffee brews, built with Spring Boot and React.

## Features
- Create, read, update, and delete coffee brew entries
- Filter brew log by brewing method (V60, French Press, Espresso, etc.)
- Form validation on both frontend and backend
- Responsive UI that works on mobile and desktop
- Dynamic page title showing brew count

## Tech Stack
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA, Hibernate Validator, Maven
- **Frontend**: React 18, Tailwind CSS, Axios
- **Database**: H2 (development), PostgreSQL (production)

## Project Structure

- backend/          Spring Boot REST API
- frontend/       React single-page application
- Documentation.md  This file
- deployment.md   Live URL and deployment notes


## Local Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Maven (or use the included wrapper)

### 1. Start the Backend
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

The API will be available at http://localhost:8080/api/brews.

### 2. Start the Frontend
In a new terminal:

cd frontend
npm install
npm start

The app will open at http://localhost:3000.
Environment Variables
Copy .env.example to .env and fill in your values. The backend reads DATABASE_URL and FRONTEND_URL from the environment. The frontend reads REACT_APP_API_URL.


---

## Step 5: Git Workflow (Assessment Requirement)

Run these commands from your **repo root**. The assessment requires tidy commits with descriptive messages.

```bash
# 1. Check what you have
git status

# 2. Stage everything
git add .

# 3. First commit — backend scaffold
git commit -m "feat: add Spring Boot backend with Brew entity, repository, and service"

# If you want to split into smaller commits (even better):
git add backend/src/main/java/com/coffeebrew/entity/
git add backend/src/main/resources/application.yml
git commit -m "feat: add Brew entity and database configuration"

git add backend/src/main/java/com/coffeebrew/controller/
git add backend/src/main/java/com/coffeebrew/exception/
git commit -m "feat: add REST controller with CRUD endpoints and validation"

# 4. Frontend commits
git add frontend/
git commit -m "feat: add React frontend with Tailwind CSS and brew management UI"

# 5. Documentation
git add Documentation.md deployment.md .env.example .gitignore
git commit -m "docs: add project documentation and environment templates"
