# 🚀 Quick Start Guide

Guía rápida para poner en marcha el proyecto en menos de 5 minutos.

## 📋 Prerrequisitos

- **Docker** y **Docker Compose** instalados
- O alternativamente: **Node.js 18+**, **Java 17+**, **Maven**, **PostgreSQL**

## ⚡ Opción 1: Docker Compose (Recomendado)

La forma más rápida de levantar toda la aplicación:

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Levantar todos los servicios

```bash
docker-compose up -d
```

Este comando:
- ✅ Crea la base de datos PostgreSQL
- ✅ Construye y levanta el backend Spring Boot
- ✅ Construye y levanta el frontend React
- ✅ Configura la red entre servicios

### 3. Esperar a que los servicios estén listos

```bash
# Ver el progreso
docker-compose logs -f
```

Espera a ver mensajes como:
- Backend: `Started TasksApplication`
- Frontend: `start worker process`

### 4. Acceder a la aplicación

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html

### 5. Registrar usuario y comenzar

1. Ve a http://localhost
2. La app redirige al login
3. Registra un nuevo usuario:
   - Username: tu_usuario
   - Email: tu_email@example.com
   - Password: tu_password (mínimo 6 caracteres)
4. ¡Listo! Comienza a crear tareas

### Comandos útiles

```bash
# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (reinicio limpio)
docker-compose down -v

# Reconstruir después de cambios
docker-compose up -d --build
```

---

## 🖥️ Opción 2: Desarrollo Local (Sin Docker)

### Paso 1: Base de Datos

**Con Docker:**
```bash
docker run -d \
  --name postgres \
  -e POSTGRES_DB=tasks_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

**O con PostgreSQL instalado localmente:**
```sql
CREATE DATABASE tasks_db;
```

### Paso 2: Backend

```bash
cd back

# Compilar y ejecutar
mvn spring-boot:run
```

Backend disponible en: http://localhost:8080

### Paso 3: Frontend

```bash
cd front

# Instalar dependencias
npm install

# Configurar para usar el backend real
cp .env.example .env

# Editar .env y configurar:
# VITE_USE_MOCK_API=false

# Ejecutar
npm run dev
```

Frontend disponible en: http://localhost:3000

---

## 🧪 Opción 3: Solo Frontend (Mock API)

Si solo quieres ver el frontend sin levantar el backend:

```bash
cd front
npm install
npm run dev
```

El frontend usa una API simulada con datos de ejemplo.

**Credenciales de prueba:**
- Usuario: `testuser`
- Password: `password123`

---

## 📝 Primeros Pasos

### 1. Registrar Usuario

**Desde la UI:**
- Accede a http://localhost
- Completa el formulario de registro

**Desde API (curl):**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login

La respuesta del registro incluye un token JWT. Si necesitas volver a hacer login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Crear Tarea

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "status": "TODO"
  }'
```

### 4. Ver Tareas

```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎯 Funcionalidades Principales

### Dashboard
- Visualiza estadísticas de tus tareas
- Gráficos interactivos de progreso
- Resumen de tareas por estado

### Tablero Kanban
- Arrastra y suelta tareas entre columnas
- Estados: TODO, IN_PROGRESS, COMPLETED
- Actualización en tiempo real

### Gestión de Tareas
- Crear, editar y eliminar tareas
- Filtrar por estado, búsqueda de texto
- Modals de confirmación elegantes

---

## 🔧 Configuración Adicional

### Variables de Entorno - Frontend

Crear `front/.env`:

```env
# Backend URL
VITE_API_URL=http://localhost:8080/api

# Usar Mock API (true) o Backend Real (false)
VITE_USE_MOCK_API=false
```

### Variables de Entorno - Backend

Editar `back/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tasks_db
    username: postgres
    password: postgres

jwt:
  secret: your-secret-key-here
  expiration: 86400000  # 24 horas
```

---

## 📚 Documentación Completa

- **README Principal**: `README.md`
- **Frontend**: `front/README.md`
- **Backend**: `back/README.md`
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Postman Collection**: `back/POSTMAN_COLLECTION.json`

---

## 🐛 Problemas Comunes

### Puerto 80 ocupado (Frontend)

```bash
# Cambiar puerto en docker-compose.yml
# Cambiar "80:80" a "3000:80"
docker-compose up -d
# Acceder en http://localhost:3000
```

### Puerto 8080 ocupado (Backend)

```bash
# Cambiar puerto en docker-compose.yml
# Cambiar "8080:8080" a "8081:8080"
docker-compose up -d
# Backend en http://localhost:8081
```

### Backend no se conecta a PostgreSQL

```bash
# Verificar que Postgres esté corriendo
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart backend
```

### Frontend muestra error de CORS

1. Verificar que el backend esté corriendo
2. Verificar configuración CORS en `SecurityConfig.java`
3. El backend debe permitir `http://localhost:3000` y `http://localhost`

---

## 🎉 ¡Listo!

Ahora tienes la aplicación completa funcionando. Puedes:
- ✅ Crear usuarios
- ✅ Gestionar tareas
- ✅ Ver estadísticas
- ✅ Usar el tablero Kanban

**¿Necesitas ayuda?** Consulta la documentación completa en `README.md`
