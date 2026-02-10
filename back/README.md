# 📋 Tasks Management API

A professional RESTful API for task management built with **Spring Boot 3**, **Java 21**, and **MongoDB**. Features JWT authentication, comprehensive validation, and production-ready Docker deployment.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 📝 **Full CRUD Operations** - Complete task management
- ✅ **Bean Validation** - Comprehensive input validation
- 🗄️ **MongoDB Database** - NoSQL document-based persistence
- 📚 **OpenAPI/Swagger** - Interactive API documentation
- 🐳 **Docker Support** - Easy deployment with Docker Compose
- 🧪 **Unit Tests** - 80%+ code coverage with JUnit 5 & Mockito
- 🏗️ **Clean Architecture** - SOLID principles applied
- 🔒 **Security** - Spring Security with password encryption
- 🚀 **Production Ready** - Health checks, logging, and monitoring

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [API Documentation](#api-documentation)

## 🛠️ Tech Stack

### Core
- **Java 17** - LTS version with latest features
- **Spring Boot 3.2.1** - Latest Spring framework
- **Maven** - Dependency management

### Database
- **MongoDB 7.0** - NoSQL database
- **Spring Data MongoDB** - Data access layer

### Security
- **Spring Security 6** - Authentication & Authorization
- **JWT (JJWT 0.12.3)** - Token-based authentication
- **BCrypt** - Password encryption

### Documentation
- **Springdoc OpenAPI 3** - API documentation
- **Swagger UI** - Interactive API explorer

### Testing
- **JUnit 5** - Unit testing framework
- **Mockito** - Mocking framework
- **Spring Boot Test** - Integration testing
- **Embedded MongoDB** - In-memory database for tests

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🏗️ Architecture

The application follows a **layered architecture** based on SOLID principles:

```
┌─────────────────────────────────────┐
│       Controller Layer              │ ← HTTP Requests/Responses
├─────────────────────────────────────┤
│       Service Layer                 │ ← Business Logic
├─────────────────────────────────────┤
│       Repository Layer              │ ← Data Access (JPA)
├─────────────────────────────────────┤
│       Database (PostgreSQL)         │ ← Data Persistence
└─────────────────────────────────────┘
```

### Project Structure

```
src/main/java/com/seek/tasks/
├── config/                 # Configuration classes
│   ├── SecurityConfig.java
│   └── OpenApiConfig.java
├── controller/            # REST endpoints
│   ├── TaskController.java
│   └── AuthController.java
├── dto/                   # Data Transfer Objects
│   ├── TaskRequestDTO.java
│   ├── TaskResponseDTO.java
│   ├── LoginRequestDTO.java
│   ├── RegisterRequestDTO.java
│   └── AuthResponseDTO.java
├── entity/               # JPA Entities
│   ├── Task.java
│   └── User.java
├── repository/           # Data access layer
│   ├── TaskRepository.java
│   └── UserRepository.java
├── service/             # Business logic
│   ├── TaskService.java
│   ├── TaskServiceImpl.java
│   ├── AuthService.java
│   └── AuthServiceImpl.java
├── security/           # Security components
│   ├── JwtTokenProvider.java
│   └── JwtAuthenticationFilter.java
├── exception/         # Exception handling
│   ├── GlobalExceptionHandler.java
│   ├── TaskNotFoundException.java
│   ├── UnauthorizedException.java
│   └── ErrorResponse.java
└── TasksApplication.java
```

## 🚀 Getting Started

### Prerequisites

- **Java 21** or higher
- **Maven 3.6+**
- **MongoDB 7.0+** (or use Docker)
- **Docker & Docker Compose** (optional)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd back
```

#### 2. Configure Database

Start MongoDB locally or with Docker:

```bash
# With Docker
docker run -d --name mongodb -p 27017:27017 mongo:7.0

# Or install MongoDB locally from:
# https://www.mongodb.com/try/download/community
```

Update `src/main/resources/application.yml` if needed:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/tasks_db
      database: tasks_db
```

#### 3. Build the project

```bash
mvn clean install
```

#### 4. Run the application

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## 🐳 Running with Docker

### Quick Start (Recommended)

The easiest way to run the application with all dependencies:

```bash
docker-compose up -d
```

This will start:
- MongoDB database on port `27017`
- Spring Boot API on port `8080`

### Check containers status

```bash
docker-compose ps
```

### View logs

```bash
docker-compose logs -f app
```

### Stop containers

```bash
docker-compose down
```

### Rebuild after code changes

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📍 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | Yes |
| GET | `/api/tasks/{id}` | Get task by ID | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/{id}` | Update task | Yes |
| PATCH | `/api/tasks/{id}/complete` | Mark as completed | Yes |
| DELETE | `/api/tasks/{id}` | Delete task | Yes |

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### 1. Register a new user

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "username": "testuser",
  "email": "test@example.com"
}
```

### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Use the token in subsequent requests

```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📝 Usage Examples

### Create a Task

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot",
    "description": "Complete Spring Boot tutorial",
    "completed": false
  }'
```

### Get All Tasks

```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update a Task

```bash
curl -X PUT http://localhost:8080/api/tasks/{task-id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Spring Boot - Updated",
    "description": "Complete advanced Spring Boot tutorial",
    "completed": false
  }'
```

### Mark Task as Completed

```bash
curl -X PATCH http://localhost:8080/api/tasks/{task-id}/complete \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Delete a Task

```bash
curl -X DELETE http://localhost:8080/api/tasks/{task-id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

### Run all tests

```bash
mvn test
```

### Run tests with coverage report

```bash
mvn clean test jacoco:report
```

View coverage report at: `target/site/jacoco/index.html`

### Test Coverage

The project maintains **80%+ code coverage** with:
- Unit tests for Services
- Unit tests for Controllers (with @WebMvcTest)
- Integration tests for Repositories (with @DataJpaTest)

## 📚 API Documentation

### Swagger UI

Once the application is running, visit:

```
http://localhost:8080/swagger-ui.html
```

### OpenAPI JSON

```
http://localhost:8080/v3/api-docs
```

The Swagger UI provides:
- Interactive API exploration
- Request/Response examples
- Authentication testing
- Schema documentation

## 🔧 Configuration

### Application Profiles

The application supports multiple profiles:

- **dev** - Development environment
- **prod** - Production environment
- **test** - Testing environment

Activate a profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Or with Docker:

```bash
docker-compose up -d
# Uses prod profile by default
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection URI | `mongodb://localhost:27017/tasks_db` |
| `MONGODB_DATABASE` | MongoDB database name | `tasks_db` |
| `JWT_SECRET` | JWT signing secret | (change in production) |
| `JWT_EXPIRATION` | Token expiration (ms) | `86400000` (24h) |
| `SERVER_PORT` | Application port | `8080` |

## 🛡️ Security

### Best Practices Implemented

- ✅ **Password Encryption** - BCrypt hashing
- ✅ **JWT Tokens** - Stateless authentication
- ✅ **CORS Configuration** - Controlled cross-origin access
- ✅ **Input Validation** - Bean Validation annotations
- ✅ **SQL Injection Prevention** - JPA parameterized queries
- ✅ **XSS Protection** - Input sanitization
- ✅ **HTTPS Ready** - Production configuration

### Production Recommendations

1. Change `JWT_SECRET` to a strong random value
2. Use environment variables for sensitive data
3. Enable HTTPS/TLS
4. Implement rate limiting
5. Add API versioning
6. Set up monitoring and logging

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run
docker-compose up -d

# Scale application
docker-compose up -d --scale app=3

# Update after changes
docker-compose up -d --build
```

### Traditional Deployment

```bash
# Build JAR
mvn clean package -DskipTests

# Run JAR
java -jar target/tasks-api-1.0.0.jar
```

## 📊 Database Schema

### Users Collection

```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "username": "testuser",
  "password": "$2a$10$...",
  "email": "test@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "_class": "com.seek.tasks.entity.User"
}
```

**Indexes:**
- `username` (unique)
- `email` (unique)

### Tasks Collection

```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "IN_PROGRESS",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T11:00:00Z",
  "_class": "com.seek.tasks.entity.Task"
}
```

**Indexes:**
- `userId` (for queries by user)

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Change port in application.yml or use environment variable
SERVER_PORT=8081 mvn spring-boot:run
```

**2. Database connection failed**
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check logs
docker-compose logs mongodb

# Test connection
mongosh mongodb://localhost:27017/tasks_db
```

**3. JWT token expired**
- Tokens expire after 24 hours by default
- Login again to get a new token

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed by Seek Team

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@seek.com or open an issue in the repository.

---

**Built with ❤️ using Spring Boot 3 and Java 17**
