# Documentación de API

Esta documentación describe los endpoints esperados del backend para el Sistema de Gestión de Tareas.

## 📋 Base URL

```
http://localhost:8080/api
```

## 🔐 Autenticación

Todos los endpoints (excepto `/auth/login`) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## 📍 Endpoints

### Authentication

#### POST /auth/login

Iniciar sesión y obtener token JWT.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response 401:**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### Tasks

#### GET /tasks

Obtener todas las tareas del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
[
  {
    "id": "1",
    "title": "Implementar autenticación",
    "description": "Crear sistema de login con JWT",
    "status": "COMPLETED",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-16T14:30:00.000Z"
  },
  {
    "id": "2",
    "title": "Diseñar dashboard",
    "description": "Crear interfaz de dashboard con gráficos",
    "status": "IN_PROGRESS",
    "createdAt": "2024-01-16T09:00:00.000Z",
    "updatedAt": "2024-01-17T11:20:00.000Z"
  }
]
```

**Response 401:**
```json
{
  "message": "No autorizado"
}
```

---

#### POST /tasks

Crear una nueva tarea.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "status": "TODO"
}
```

**Validaciones:**
- `title`: requerido, 3-100 caracteres
- `description`: requerido, 10-500 caracteres
- `status`: enum ["TODO", "IN_PROGRESS", "COMPLETED"]

**Response 201:**
```json
{
  "id": "3",
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "status": "TODO",
  "createdAt": "2024-01-17T15:00:00.000Z",
  "updatedAt": "2024-01-17T15:00:00.000Z"
}
```

**Response 400:**
```json
{
  "message": "Datos inválidos",
  "errors": {
    "title": "El título es requerido",
    "description": "La descripción debe tener al menos 10 caracteres"
  }
}
```

---

#### PUT /tasks/:id/status

Actualizar el estado de una tarea.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: ID de la tarea

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```

**Response 200:**
```json
{
  "id": "1",
  "title": "Implementar autenticación",
  "description": "Crear sistema de login con JWT",
  "status": "COMPLETED",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-17T15:30:00.000Z"
}
```

**Response 404:**
```json
{
  "message": "Tarea no encontrada"
}
```

---

#### DELETE /tasks/:id

Eliminar una tarea.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: ID de la tarea

**Response 204:**
```
No Content
```

**Response 404:**
```json
{
  "message": "Tarea no encontrada"
}
```

---

## 📊 Modelos de Datos

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
}
```

### Task

```typescript
type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### LoginCredentials

```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

### LoginResponse

```typescript
interface LoginResponse {
  token: string;
  user: User;
}
```

### CreateTaskDto

```typescript
interface CreateTaskDto {
  title: string;
  description: string;
  status?: TaskStatus; // Default: 'TODO'
}
```

### UpdateTaskStatusDto

```typescript
interface UpdateTaskStatusDto {
  status: TaskStatus;
}
```

---

## 🔒 Seguridad

### JWT Token

El token JWT debe incluir:

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "iat": 1516239022,
  "exp": 1516242622
}
```

### CORS

El backend debe permitir requests desde el frontend:

```javascript
// Express example
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Rate Limiting

Recomendado implementar rate limiting:

```
- Login: 5 intentos por 15 minutos
- API calls: 100 requests por minuto
```

---

## ⚠️ Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🧪 Testing con cURL

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Tasks

```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Task

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "status": "TODO"
  }'
```

### Update Task Status

```bash
curl -X PUT http://localhost:8080/api/tasks/1/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

### Delete Task

```bash
curl -X DELETE http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Implementación de Ejemplo (Express)

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.userId = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validar credenciales
  // ...
  
  const token = jwt.sign(
    { sub: user.id, email: user.email },
    'SECRET_KEY',
    { expiresIn: '24h' }
  );
  
  res.json({ token, user });
});

// Get Tasks
app.get('/api/tasks', authMiddleware, (req, res) => {
  // Obtener tareas del usuario
  const tasks = getTasks(req.userId);
  res.json(tasks);
});

// Create Task
app.post('/api/tasks', authMiddleware, (req, res) => {
  const task = createTask(req.userId, req.body);
  res.status(201).json(task);
});

// Update Task Status
app.put('/api/tasks/:id/status', authMiddleware, (req, res) => {
  const task = updateTaskStatus(req.params.id, req.body.status);
  res.json(task);
});

// Delete Task
app.delete('/api/tasks/:id', authMiddleware, (req, res) => {
  deleteTask(req.params.id);
  res.status(204).send();
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
```

---

## 📚 Recursos Adicionales

- [JWT.io](https://jwt.io/) - Debugger de JWT
- [Postman](https://www.postman.com/) - Testing de APIs
- [Swagger](https://swagger.io/) - Documentación de APIs

---

**Última actualización**: 2024-01-17
