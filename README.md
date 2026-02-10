# 📋 Task Management System - Full Stack Application

> Sistema de gestión de tareas construido con arquitectura: **React + TypeScript** en el frontend y **Spring Boot + MongoDB** en el backend.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌐 Demo en Vivo

- **Frontend**: [https://task-management-app-jxe7.onrender.com](https://task-management-app-jxe7.onrender.com)
- **Backend API**: [https://haku31-ask-management-fullstack.onrender.com](https://haku31-ask-management-fullstack.onrender.com)
- **Swagger Docs**: [https://haku31-ask-management-fullstack.onrender.com/swagger-ui.html](https://haku31-ask-management-fullstack.onrender.com/swagger-ui.html)

- **usuario prueba**: admin
- **contraseña**: admin123

## 📸 Capturas de Pantalla

### Login & Dashboard
![Login](https://via.placeholder.com/800x400?text=Login+Screen)
*Pantalla de inicio de sesión con validación y autenticación JWT*

### Gestión de Tareas (Kanban)
![Tasks](https://via.placeholder.com/800x400?text=Task+Board+Kanban)
*Tablero Kanban con drag & drop para gestión visual de tareas*

### Dashboard & Analytics
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Analytics)
*Dashboard con métricas y gráficos interactivos*

## 📁 Estructura del Proyecto

```
.
├── front/              # Frontend React + TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── back/               # Backend Spring Boot + Java
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml  # Orquestación completa
└── README.md          # Este archivo
```

## ✨ Características

### Frontend (React + TypeScript)
- ⚛️ React 18 con TypeScript
- 🎨 Material-UI v5 - Diseño profesional
- 🔄 Redux Toolkit - Estado global
- 📊 Recharts - Gráficos interactivos
- 🎭 Framer Motion - Animaciones suaves
- 📱 100% Responsive - Mobile, tablet, desktop
- 🎯 Drag & Drop - Tablero Kanban estilo Jira
- ✅ Validación - React Hook Form + Yup
- 🧪 Tests - Jest + React Testing Library

### Backend (Spring Boot + Java)
- ☕ Java 21 + Spring Boot 3.2.1
- 🔐 JWT Authentication - Seguridad robusta
- 🗄️ MongoDB - Base de datos NoSQL
- 📚 OpenAPI/Swagger - Documentación interactiva
- ✅ Bean Validation - Validación de datos
- 🏗️ Arquitectura en capas - SOLID principles
- 🧪 Tests - JUnit 5 + Mockito (>80% coverage)
- 🐳 Docker - Containerización completa

## 🏗️ Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React 18 + TypeScript + Redux Toolkit                  │   │
│  │  - Components (Material-UI)                             │   │
│  │  - State Management (Redux)                             │   │
│  │  - Routing (React Router v6)                            │   │
│  │  - API Client (Axios)                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND API                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Spring Boot 3.2.1 + Java 21                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Controllers  │  │  Services    │  │ Repositories │  │   │
│  │  │  (REST API)  │→ │  (Business)  │→ │  (Data Layer)│  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  Security Layer (JWT + Spring Security)          │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ MongoDB Driver
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Collections: users, tasks                              │   │
│  │  - Indexes optimizados                                  │   │
│  │  - Validación de esquemas                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Autenticación

1. Usuario ingresa credenciales en el frontend
2. Frontend envía POST `/api/auth/login`
3. Backend valida credenciales con MongoDB
4. Backend genera JWT token con `jjwt`
5. Frontend almacena token en localStorage
6. Frontend incluye token en header `Authorization: Bearer <token>`
7. Backend valida token en cada petición con filtro JWT

### Tecnologías Clave

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Frontend** | React 18 | Biblioteca UI |
| | TypeScript | Type safety |
| | Redux Toolkit | Estado global |
| | Material-UI | Componentes UI |
| | Axios | HTTP client |
| | React Router | Navegación |
| | Framer Motion | Animaciones |
| | Recharts | Gráficos |
| **Backend** | Spring Boot 3 | Framework |
| | Spring Security | Autenticación/Autorización |
| | Spring Data MongoDB | ORM MongoDB |
| | JJWT | JWT tokens |
| | Springdoc OpenAPI | Documentación API |
| | JUnit 5 + Mockito | Testing |
| **Database** | MongoDB 7.0 | Base de datos NoSQL |
| **DevOps** | Docker | Containerización |
| | Docker Compose | Orquestación |
| | GitHub Actions | CI/CD (opcional) |

## 🚀 Inicio Rápido (3 opciones)

### Opción 1: Docker Compose (Recomendado) 🐳

Levanta toda la aplicación (frontend + backend + database) con un solo comando:

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

**URLs:**
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

### Opción 2: Desarrollo Local (Frontend Mock API)

**Frontend solo (sin backend):**

```bash
cd front
npm install
npm run dev
```

Abre http://localhost:3000

**Credenciales de prueba:**
- Usuario: `testuser`
- Password: `password123`

### Opción 3: Desarrollo Local (Frontend + Backend)

**1. Iniciar Base de Datos:**

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:7.0
```

**2. Iniciar Backend:**

```bash
cd back
mvn spring-boot:run
```

Backend en: http://localhost:8080

**3. Iniciar Frontend:**

```bash
cd front

# Configurar para usar backend real
echo "VITE_API_URL=http://localhost:8080/api" > .env
echo "VITE_USE_MOCK_API=false" >> .env

npm run dev
```

Frontend en: http://localhost:3000

## 🔑 Autenticación

### Registrar Nuevo Usuario

**Endpoint:** `POST http://localhost:8080/api/auth/register`

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
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

### Login

**Endpoint:** `POST http://localhost:8080/api/auth/login`

```json
{
  "username": "testuser",
  "password": "password123"
}
```

## 📍 Endpoints de la API

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |

### Tasks (Requieren autenticación)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| GET | `/api/tasks/{id}` | Obtener tarea específica |
| POST | `/api/tasks` | Crear tarea |
| PUT | `/api/tasks/{id}` | Actualizar tarea completa |
| PUT | `/api/tasks/{id}/status` | Actualizar solo estado |
| PATCH | `/api/tasks/{id}/complete` | Marcar como completada |
| DELETE | `/api/tasks/{id}` | Eliminar tarea |

## 🎯 Estados de Tareas

- `TODO` - Por hacer
- `IN_PROGRESS` - En progreso
- `COMPLETED` - Completada

## 📊 Stack Tecnológico Completo

### Frontend
- React 18.2 + TypeScript 5.3
- Redux Toolkit 2.0
- Material-UI (MUI) v5
- React Router v6
- Axios
- Recharts
- React Hook Form + Yup
- Framer Motion
- @dnd-kit (Drag & Drop)
- Vite 5.0
- Jest + React Testing Library

### Backend
- Java 21
- Spring Boot 3.2.1
- Spring Security 6
- Spring Data MongoDB
- MongoDB 7.0
- JWT (JJWT 0.12.3)
- Springdoc OpenAPI 3
- Lombok
- JUnit 5 + Mockito
- Maven

### DevOps
- Docker & Docker Compose
- Nginx (frontend proxy)
- Multi-stage builds
- Health checks

## 🧪 Testing

### Frontend Tests
```bash
cd front
npm test
npm test -- --coverage
```

### Backend Tests
```bash
cd back
mvn test
mvn test jacoco:report
```

Ver reporte en: `back/target/site/jacoco/index.html`

## 📚 Documentación

### Frontend
- `front/README.md` - Documentación completa del frontend
- `front/QUICK_START.md` - Guía rápida
- `front/docs/ARCHITECTURE.md` - Arquitectura
- `front/docs/API.md` - Integración con API
- `front/docs/DEPLOYMENT.md` - Deployment

### Backend
- `back/README.md` - Documentación completa del backend
- `back/POSTMAN_COLLECTION.json` - Colección de Postman
- Swagger UI: http://localhost:8080/swagger-ui.html

## 🔧 Configuración

### Variables de Entorno - Frontend

Crear `front/.env`:

```env
# Usar backend real
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=false

# O usar Mock API (sin backend)
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=true
```

### Variables de Entorno - Backend

El backend usa `back/src/main/resources/application.yml` con perfiles:
- `dev` - Desarrollo
- `prod` - Producción
- `test` - Testing

Variables principales:
```yaml
MONGODB_URI=mongodb://localhost:27017/tasks_db
MONGODB_DATABASE=tasks_db
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
```

## 🐳 Docker Commands

### Levantar todo el stack
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Reconstruir después de cambios
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Limpiar todo
```bash
docker-compose down -v
```

## 🎨 Características de UI

- ✅ Dashboard con gráficos interactivos
- ✅ Tablero Kanban con drag & drop
- ✅ Vista de lista con grid responsivo
- ✅ Filtros y búsqueda en tiempo real
- ✅ Modals de confirmación personalizados
- ✅ Notificaciones toast
- ✅ Loading states con skeletons
- ✅ Animaciones suaves
- ✅ Tema Material-UI personalizado
- ✅ Responsive design completo

## 🏗️ Arquitectura

### Frontend (Feature-Based)
```
src/
├── app/           # Redux store
├── features/      # Módulos (auth, tasks)
├── pages/         # Páginas principales
├── shared/        # Componentes compartidos
└── tests/         # Tests unitarios
```

### Backend (Layered Architecture)
```
src/main/java/com/seek/tasks/
├── config/        # Configuración
├── controller/    # REST endpoints
├── dto/           # Data Transfer Objects
├── entity/        # JPA entities
├── repository/    # Data access
├── service/       # Business logic
├── security/      # JWT & Security
└── exception/     # Exception handling
```

## 📊 Base de Datos MongoDB

### Collections

**Users:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "username": "testuser",
  "password": "$2a$10$hashedPassword",
  "email": "test@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```
*Indexes:* `username` (unique), `email` (unique)

**Tasks:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "title": "My Task",
  "description": "Task description",
  "status": "TODO",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```
*Indexes:* `userId`

### Acceder a MongoDB

```bash
# Conectar con mongosh
mongosh mongodb://localhost:27017/tasks_db

# Comandos útiles
show collections
db.users.find()
db.tasks.find()
db.users.countDocuments()
```

## 🔒 Seguridad

- ✅ JWT Token authentication
- ✅ BCrypt password encryption
- ✅ CORS configurado
- ✅ SQL injection prevention (JPA)
- ✅ XSS protection
- ✅ Input validation
- ✅ Secure headers
- ✅ HTTPS ready

## 📈 Monitoreo

### Health Checks

- **Backend**: http://localhost:8080/actuator/health
- **Frontend**: http://localhost/
- **Database**: Puerto 5432

### Logs

```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f postgres
```

## 🚀 Despliegue en Producción

### 📦 **Guía Completa de Despliegue**

Para desplegar la aplicación en producción (Render, Vercel, AWS, etc.), consulta la guía completa:

👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa paso a paso

La guía incluye:
- ✅ Despliegue en **Render** (Backend + Frontend) - **RECOMENDADO**
- ✅ Despliegue en **Vercel** (Frontend) + **Render** (Backend)
- ✅ Despliegue en **AWS EC2** (Free Tier)
- ✅ Configuración de **MongoDB Atlas** (base de datos en la nube)
- ✅ Variables de entorno para producción
- ✅ Cómo dar acceso a colaboradores
- ✅ Solución de problemas comunes

### 🐳 Opción Rápida: Docker Local

```bash
# Levantar toda la aplicación
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

URLs locales:
- Frontend: http://localhost
- Backend: http://localhost:8081
- Swagger: http://localhost:8081/swagger-ui.html

### 📋 Checklist Pre-Despliegue

Antes de desplegar, asegúrate de:

- [ ] `.env` y archivos sensibles están en `.gitignore`
- [ ] Variables de entorno configuradas correctamente
- [ ] MongoDB Atlas configurado con usuario y whitelist IP
- [ ] CORS configurado en el backend para la URL del frontend
- [ ] Tests pasan correctamente (`npm test` y `mvn test`)
- [ ] Build funciona sin errores (`npm run build` y `mvn package`)
- [ ] Docker Compose funciona localmente
- [ ] README actualizado con URLs de producción

## 🛠️ Comandos Útiles

### Frontend
```bash
cd front
npm run dev          # Desarrollo
npm run build        # Build producción
npm test            # Tests
npm run lint        # Linting
npm run format      # Formateo
```

### Backend
```bash
cd back
mvn spring-boot:run  # Desarrollo
mvn clean package   # Build
mvn test            # Tests
mvn test jacoco:report  # Coverage
```

## 🐛 Troubleshooting

### Frontend no se conecta al backend

1. Verificar que el backend esté corriendo: http://localhost:8080/actuator/health
2. Verificar `.env`:
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_USE_MOCK_API=false
   ```
3. Verificar CORS en `back/src/main/java/com/seek/tasks/config/SecurityConfig.java`

### Backend no inicia

1. Verificar MongoDB esté corriendo: `docker ps | grep mongo`
2. Verificar conexión: `mongosh mongodb://localhost:27017/tasks_db`
3. Ver logs: `docker-compose logs backend`
4. Ver logs de MongoDB: `docker-compose logs mongodb`

### Errores de puerto ocupado

```bash
# Cambiar puertos en docker-compose.yml
# Frontend: cambiar "80:80" a "3000:80"
# Backend: cambiar "8080:8080" a "8081:8080"
```

## 📝 Notas de Desarrollo

### Primer Uso

1. **Registrar usuario** en http://localhost/login (si usas el frontend)
2. O usar Postman/curl:
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","email":"admin@test.com","password":"admin123"}'
   ```

### Datos de Prueba

Con Mock API activada (`VITE_USE_MOCK_API=true`), el frontend incluye 8 tareas de ejemplo.

## 📖 Documentación Adicional

- **Frontend**: Ver `front/README.md`
- **Backend**: Ver `back/README.md`
- **API Docs**: http://localhost:8080/swagger-ui.html
- **Postman**: Importar `back/POSTMAN_COLLECTION.json`

## 🤝 Contribuir

Ver `front/CONTRIBUTING.md` y `back/CONTRIBUTING.md` (si existen)

## 📄 Licencia

MIT License - Ver `LICENSE`

## 👥 Equipo

Desarrollado por Seek Team

---

## 🎯 Quick Commands

```bash
# Levantar todo con Docker
docker-compose up -d

# Solo frontend (con mock)
cd front && npm run dev

# Solo backend
cd back && mvn spring-boot:run

# Tests completos
cd front && npm test
cd back && mvn test

# Build de producción
docker-compose build
```

---

**¡Proyecto completo y listo para usar! 🚀**

**URLs importantes:**
- Frontend: http://localhost (o http://localhost:3000)
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs
