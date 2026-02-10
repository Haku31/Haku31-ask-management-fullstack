# 📝 Comandos Útiles

Guía rápida de comandos para el proyecto.

## 🐳 Docker Compose

### Iniciar todo
```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Detener y reiniciar
```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (limpieza completa)
docker-compose down -v

# Reiniciar un servicio
docker-compose restart backend

# Reconstruir después de cambios
docker-compose up -d --build

# Reconstruir sin caché
docker-compose build --no-cache
docker-compose up -d
```

### Inspección
```bash
# Ver estado de contenedores
docker-compose ps

# Ejecutar comando en un contenedor
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d tasks_db

# Ver uso de recursos
docker stats
```

## 🚀 Frontend (React)

```bash
cd front

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview

# Tests
npm test
npm test -- --coverage
npm test -- --watch

# Linting
npm run lint
npm run lint:fix

# Formateo
npm run format

# Type checking
npm run type-check
```

## ☕ Backend (Spring Boot)

```bash
cd back

# Desarrollo
mvn spring-boot:run

# Con perfil específico
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Build
mvn clean install
mvn clean package
mvn clean package -DskipTests

# Tests
mvn test
mvn test -Dtest=TaskServiceImplTest

# Coverage
mvn test jacoco:report
# Ver: target/site/jacoco/index.html

# Clean
mvn clean

# Ejecutar JAR
java -jar target/tasks-api-1.0.0.jar
java -jar -Dspring.profiles.active=prod target/tasks-api-1.0.0.jar
```

## 🗄️ PostgreSQL

### Con Docker
```bash
# Iniciar PostgreSQL
docker run -d \
  --name postgres \
  -e POSTGRES_DB=tasks_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine

# Conectar a la base de datos
docker exec -it postgres psql -U postgres -d tasks_db

# Ver logs
docker logs postgres

# Detener y eliminar
docker stop postgres
docker rm postgres
```

### Comandos SQL útiles
```sql
-- Ver tablas
\dt

-- Describir tabla
\d tasks
\d users

-- Ver usuarios
SELECT * FROM users;

-- Ver tareas
SELECT * FROM tasks;

-- Eliminar todo
DROP TABLE tasks CASCADE;
DROP TABLE users CASCADE;
```

## 📡 API Testing (curl)

### Authentication

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Guardar token:**
```bash
export TOKEN="your-jwt-token-here"
```

### Tasks

**Get all tasks:**
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

**Create task:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "TODO"
  }'
```

**Update task:**
```bash
curl -X PUT http://localhost:8080/api/tasks/{task-id} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "status": "IN_PROGRESS"
  }'
```

**Update status only:**
```bash
curl -X PUT http://localhost:8080/api/tasks/{task-id}/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

**Delete task:**
```bash
curl -X DELETE http://localhost:8080/api/tasks/{task-id} \
  -H "Authorization: Bearer $TOKEN"
```

## 🧹 Limpieza

### Limpiar Docker
```bash
# Detener todos los contenedores
docker stop $(docker ps -aq)

# Eliminar contenedores
docker rm $(docker ps -aq)

# Eliminar imágenes
docker rmi $(docker images -q)

# Limpiar todo (cuidado!)
docker system prune -a --volumes

# Limpiar solo este proyecto
docker-compose down -v --rmi all
```

### Limpiar Frontend
```bash
cd front
rm -rf node_modules
rm -rf dist
rm -rf coverage
npm cache clean --force
npm install
```

### Limpiar Backend
```bash
cd back
mvn clean
rm -rf target
```

## 🔍 Debugging

### Ver logs de aplicación
```bash
# Backend logs (en contenedor)
docker-compose logs -f backend

# Backend logs (local)
tail -f logs/spring.log

# Frontend logs (navegador)
# Abrir DevTools (F12) > Console
```

### Health checks
```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database connectivity
docker-compose exec postgres pg_isready -U postgres

# Ver todos los endpoints actuator
curl http://localhost:8080/actuator
```

### Inspeccionar contenedores
```bash
# Entrar al contenedor del backend
docker-compose exec backend bash

# Entrar a la base de datos
docker-compose exec postgres psql -U postgres -d tasks_db

# Ver variables de entorno
docker-compose exec backend env

# Ver procesos
docker-compose top
```

## 📊 Monitoreo

### Ver uso de recursos
```bash
# Recursos de contenedores
docker stats

# Espacio en disco
docker system df

# Ver logs con timestamp
docker-compose logs -f --timestamps
```

### Base de datos
```bash
# Backup de la base de datos
docker exec postgres pg_dump -U postgres tasks_db > backup.sql

# Restaurar backup
docker exec -i postgres psql -U postgres tasks_db < backup.sql

# Ver tamaño de tablas
docker-compose exec postgres psql -U postgres -d tasks_db -c "
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"
```

## 🚀 Deployment

### Build de producción
```bash
# Frontend
cd front
npm run build
# Archivos en: dist/

# Backend
cd back
mvn clean package -DskipTests
# JAR en: target/tasks-api-1.0.0.jar

# Docker
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
```

### Ejecutar en producción
```bash
# Con Docker Compose
docker-compose -f docker-compose.yml up -d

# Backend standalone
cd back
java -jar -Dspring.profiles.active=prod target/tasks-api-1.0.0.jar

# Frontend standalone (con nginx)
# Copiar carpeta front/dist/ a /var/www/html/
```

## 🔧 Troubleshooting

### Cambiar puertos
```bash
# Frontend: editar docker-compose.yml
# Cambiar "80:80" a "3000:80"

# Backend: editar docker-compose.yml
# Cambiar "8080:8080" a "8081:8080"

# O usar variables de entorno
SERVER_PORT=8081 mvn spring-boot:run
```

### Reinicio completo
```bash
# Detener todo
docker-compose down -v

# Limpiar imágenes
docker-compose rm -f
docker rmi front_seek_backend front_seek_frontend

# Reconstruir
docker-compose build --no-cache
docker-compose up -d
```

### Ver errores
```bash
# Logs con errores
docker-compose logs backend | grep -i error
docker-compose logs frontend | grep -i error

# Últimas 100 líneas
docker-compose logs --tail=100 backend
```

---

## 📚 Documentación

- **README**: Documentación principal
- **QUICK_START**: Guía de inicio rápido
- **Frontend**: `front/README.md`
- **Backend**: `back/README.md`
- **API Docs**: http://localhost:8080/swagger-ui.html
- **Postman**: Importar `back/POSTMAN_COLLECTION.json`
