# 📝 Resumen de Cambios: PostgreSQL → MongoDB

## ✅ Cambios Completados

### 1. Dependencias (`pom.xml`)
- ❌ Removido: `spring-boot-starter-data-jpa`
- ❌ Removido: `postgresql`
- ❌ Removido: `h2` (para tests)
- ✅ Agregado: `spring-boot-starter-data-mongodb`
- ✅ Agregado: `de.flapdoodle.embed.mongo` (para tests)

### 2. Entidades
**Antes (JPA):**
```java
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
```

**Después (MongoDB):**
```java
@Document(collection = "users")
public class User {
    @Id
    private String id;  // MongoDB genera IDs como String
}
```

### 3. Repositorios
**Antes:**
```java
public interface UserRepository extends JpaRepository<User, Long>
public interface TaskRepository extends JpaRepository<Task, String>
```

**Después:**
```java
public interface UserRepository extends MongoRepository<User, String>
public interface TaskRepository extends MongoRepository<Task, String>
```

### 4. Tipos de ID Cambiados
- `User.id`: `Long` → `String`
- `Task.userId`: `Long` → `String`
- Todos los métodos de servicio actualizados para usar `String` en lugar de `Long`

### 5. Configuración (`application.yml`)
**Antes (PostgreSQL):**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tasks_db
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
```

**Después (MongoDB):**
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/tasks_db
      database: tasks_db
      auto-index-creation: true
```

### 6. Anotaciones de Auditoría
**Antes:**
```java
@EnableJpaAuditing
@EntityListeners(AuditingEntityListener.class)
```

**Después:**
```java
@EnableMongoAuditing
// No se necesita EntityListeners
```

### 7. Docker Compose
**Antes:**
```yaml
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
```

**Después:**
```yaml
services:
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
```

### 8. Tests
- Todos los tests actualizados para usar `String` en lugar de `Long` para IDs
- Configuración de test para usar embedded MongoDB
- Mock data actualizado

### 9. DTOs
- `AuthResponseDTO.userId`: `Long` → `String`
- Frontend actualizado para usar `userId` como `string`

### 10. Frontend (TypeScript)
```typescript
// Antes
interface User {
  userId: number;
}

// Después
interface User {
  userId: string;
}
```

---

## 📋 Ventajas de MongoDB vs PostgreSQL

### ✅ Ventajas de MongoDB
1. **Esquema Flexible** - No necesitas migraciones para cambios de esquema
2. **Escalabilidad Horizontal** - Fácil de escalar con sharding
3. **Desarrollo Rápido** - Menos código boilerplate, no necesitas SQL
4. **Documentos JSON** - Mapeo natural con JavaScript/TypeScript
5. **Sin Joins** - Queries más simples para estructuras de datos anidadas
6. **Mejor para este caso** - Estructura de datos simple (users + tasks)

### ⚠️ Desventajas (para este proyecto específico)
1. Sin transacciones ACID complejas (no necesarias aquí)
2. Sin relaciones/joins nativos (no necesarios aquí)
3. Mayor uso de memoria (no relevante para este tamaño)

---

## 🚀 Cómo Ejecutar con MongoDB

### Opción 1: Docker (Recomendado)
```bash
cd back
docker-compose up -d
```

### Opción 2: MongoDB Local
```bash
# Instalar MongoDB
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community@7.0
# Linux: sudo apt-get install mongodb-org

# Ejecutar backend
cd back
mvn spring-boot:run
```

### Opción 3: Docker Compose completo (Front + Back + DB)
```bash
# Desde la raíz del proyecto
docker-compose up -d
```

---

## 🔍 Verificar MongoDB

### Conectarse a MongoDB
```bash
mongosh mongodb://localhost:27017/tasks_db

# Comandos útiles
show dbs                    # Ver bases de datos
use tasks_db                # Cambiar a tasks_db
show collections            # Ver colecciones
db.users.find()             # Ver usuarios
db.tasks.find()             # Ver tareas
db.users.countDocuments()   # Contar usuarios
```

### MongoDB Compass (GUI)
- Descargar: https://www.mongodb.com/products/compass
- Conectar a: `mongodb://localhost:27017`

---

## 📊 Estructura de Datos

### Users Collection
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "username": "testuser",
  "password": "$2a$10$hashedPassword",
  "email": "test@example.com",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "_class": "com.seek.tasks.entity.User"
}
```

### Tasks Collection
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "title": "My Task",
  "description": "Task description",
  "status": "TODO",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "createdAt": ISODate("2024-01-15T10:35:00Z"),
  "updatedAt": ISODate("2024-01-15T11:00:00Z"),
  "_class": "com.seek.tasks.entity.Task"
}
```

---

## ✅ Todo Funciona Igual

- ✅ Todos los endpoints REST funcionan igual
- ✅ JWT authentication funciona igual
- ✅ Frontend funciona igual (solo cambia tipo de userId)
- ✅ Swagger/OpenAPI funciona igual
- ✅ Docker funciona igual
- ✅ Tests funcionan igual

---

## 📝 Archivos Modificados

### Backend
1. `pom.xml` - Dependencias
2. `TasksApplication.java` - @EnableMongoAuditing
3. `entity/User.java` - @Document, ID tipo String
4. `entity/Task.java` - @Document, userId tipo String
5. `repository/*.java` - MongoRepository
6. `service/*.java` - Tipos String para IDs
7. `dto/AuthResponseDTO.java` - userId String
8. `exception/TaskNotFoundException.java` - String en mensaje
9. `application.yml` - Config MongoDB
10. `application-test.yml` - Config MongoDB test
11. `docker-compose.yml` - MongoDB en lugar de Postgres
12. Todos los tests - IDs String

### Frontend
1. `auth.types.ts` - userId: string
2. `mockData.ts` - userId string

### Raíz
1. `docker-compose.yml` - MongoDB en lugar de Postgres

---

## 🎉 Resultado Final

✅ **Backend completamente funcional con MongoDB**
✅ **Todos los tests pasando**
✅ **Docker Compose actualizado**
✅ **Frontend compatible**
✅ **Documentación actualizada**

**El proyecto ahora usa MongoDB en lugar de PostgreSQL! 🚀**
