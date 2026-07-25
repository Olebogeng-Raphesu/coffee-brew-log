# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot backend
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
# Copy the built React app into Spring Boot's static resources
COPY --from=frontend-build /app/frontend/build/ ./src/main/resources/static/
RUN mvn clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]