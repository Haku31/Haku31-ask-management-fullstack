# 📋 Instrucciones de Entrega - Proyecto Task Management System

## 🎯 Objetivo

Entregar un proyecto Full-Stack profesional con:
1. ✅ Repositorio de GitHub con código fuente
2. ✅ Aplicación desplegada en la nube (AWS o similar)
3. ✅ Acceso a colaboradores para revisión

---

## 📦 Paso 1: Subir a GitHub (URGENTE - Hacer AHORA)

### Guía Completa
👉 Lee: **[GITHUB_SETUP.md](./GITHUB_SETUP.md)**

### Resumen Rápido

```powershell
# 1. Navegar al proyecto
cd "C:\Users\asus\Desktop\front seek"

# 2. Inicializar Git (si no está)
git init

# 3. Agregar archivos
git add .

# 4. Crear commit
git commit -m "Initial commit: Full-Stack Task Management System"

# 5. Crear repositorio en GitHub
# Ve a: https://github.com/new
# Nombre: task-management-fullstack
# Visibilidad: Public
# NO marcar "Initialize with README"

# 6. Conectar con GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/task-management-fullstack.git

# 7. Subir código
git push -u origin main
```

**⚠️ IMPORTANTE**: Necesitarás un **Personal Access Token** para autenticarte:
- GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Scope: `repo` (full control)
- Usa el token como password cuando Git te pida

---

## 🚀 Paso 2: Desplegar en la Nube

### Guía Completa
👉 Lee: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Opción Recomendada: Render (100% Gratis)

#### A. Crear cuenta en MongoDB Atlas (Base de Datos)
1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea cluster gratis (M0)
3. Crea usuario: `taskapp` / `[password-seguro]`
4. Network Access: Permitir `0.0.0.0/0`
5. Copia connection string:
   ```
   mongodb+srv://taskapp:PASSWORD@cluster0.xxxxx.mongodb.net/tasks
   ```

#### B. Desplegar Backend en Render
1. Ve a: https://render.com/ → Sign up con GitHub
2. **New +** → **Web Service**
3. Conecta tu repositorio
4. Configuración:
   - **Root Directory**: `back`
   - **Runtime**: Docker
   - **Instance Type**: Free

5. **Environment Variables** (agregar):
   ```
   MONGODB_URI=mongodb+srv://taskapp:PASSWORD@cluster0.xxxxx.mongodb.net/tasks?retryWrites=true&w=majority
   MONGODB_DATABASE=tasks
   JWT_SECRET=cambiar-por-string-seguro-minimo-64-caracteres-random-12345678901234567890
   JWT_EXPIRATION=86400000
   SPRING_PROFILES_ACTIVE=prod
   ```

6. **Create Web Service** → Espera 5-10 min
7. Copia URL: `https://task-api-xxxx.onrender.com`

#### C. Desplegar Frontend en Render
1. Render → **New +** → **Static Site**
2. Mismo repositorio
3. Configuración:
   - **Root Directory**: `front`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://task-api-xxxx.onrender.com/api
   VITE_USE_MOCK_API=false
   ```

5. **Create Static Site** → Espera 3-5 min
6. Copia URL: `https://task-app-xxxx.onrender.com`

---

## 👥 Paso 3: Dar Acceso a Colaboradores

### GitHub (Código)
1. Tu repositorio → **Settings** → **Collaborators**
2. **Add people** → Ingresa username/email del evaluador
3. Click **Add to repository**

### Render (Servicios desplegados)
1. Dashboard Render → Click en servicio (backend/frontend)
2. **Settings** → **Team** → **Invite Team Member**
3. Ingresa email del evaluador
4. Rol: **Viewer** (solo lectura)

### MongoDB Atlas (Base de datos - Opcional)
1. MongoDB Atlas → **Access Manager**
2. **Invite Users** → Email del evaluador
3. Rol: **Project Read Only**

---

## ✅ Verificación Final

### 1. Verificar GitHub
- [ ] Repositorio creado y público
- [ ] Todo el código subido
- [ ] README.md se ve correctamente
- [ ] No hay archivos `.env` o `node_modules` (verificar en GitHub)
- [ ] Colaboradores agregados

### 2. Verificar Backend Desplegado
```bash
# Health check
curl https://tu-backend.onrender.com/actuator/health

# Debería retornar: {"status":"UP"}
```

- [ ] Backend responde correctamente
- [ ] Swagger accesible: `https://tu-backend.onrender.com/swagger-ui.html`
- [ ] Puedes registrar un usuario desde Swagger

### 3. Verificar Frontend Desplegado
- [ ] Frontend se abre correctamente
- [ ] Puedes registrar un nuevo usuario
- [ ] Puedes iniciar sesión
- [ ] Puedes crear, editar y eliminar tareas
- [ ] Dashboard muestra estadísticas
- [ ] No hay errores en consola del navegador (F12)

### 4. Verificar Base de Datos
- [ ] MongoDB Atlas tiene datos
- [ ] Collection `users` tiene usuarios
- [ ] Collection `tasks` tiene tareas creadas

---

## 📝 Documento de Entrega

### Formato Sugerido

```markdown
# Entrega: Sistema de Gestión de Tareas Full-Stack

## Estudiante
- **Nombre**: [Tu nombre]
- **Email**: [Tu email]

## URLs del Proyecto

### Repositorio GitHub
- **URL**: https://github.com/TU_USUARIO/task-management-fullstack
- **Acceso**: Público / Colaboradores agregados

### Aplicación Desplegada
- **Frontend**: https://task-app-xxxx.onrender.com
- **Backend API**: https://task-api-xxxx.onrender.com
- **Swagger/Documentación**: https://task-api-xxxx.onrender.com/swagger-ui.html

### Credenciales de Prueba
- **Usuario**: admin
- **Password**: admin123

(O crea nuevas desde la interfaz de registro)

## Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Redux Toolkit (estado global)
- Material-UI v5
- Framer Motion (animaciones)
- Recharts (gráficos)
- React Hook Form + Yup (validación)

### Backend
- Java 21 + Spring Boot 3.2.1
- Spring Security + JWT
- Spring Data MongoDB
- OpenAPI 3 / Swagger
- JUnit 5 + Mockito (tests >80%)

### Database
- MongoDB 7.0 (MongoDB Atlas)

### DevOps
- Docker + Docker Compose
- Render (hosting)
- GitHub (control de versiones)

## Características Implementadas

✅ Autenticación JWT (registro e inicio de sesión)
✅ CRUD completo de tareas
✅ Tablero Kanban con drag & drop
✅ Dashboard con métricas y gráficos
✅ Validación de formularios
✅ Manejo de errores
✅ API documentada con Swagger
✅ Tests unitarios (frontend y backend)
✅ Dockerización completa
✅ Responsive design

## Instrucciones de Prueba

### 1. Acceder al Frontend
Ir a: https://task-app-xxxx.onrender.com

### 2. Crear cuenta
- Click en "Registrarse"
- Ingresar datos
- Automáticamente inicia sesión

### 3. Probar funcionalidades
- Crear tareas
- Cambiar estado (drag & drop)
- Ver dashboard
- Logout y volver a entrar

### 4. Revisar API
- Ir a: https://task-api-xxxx.onrender.com/swagger-ui.html
- Probar endpoints desde Swagger

## Notas Adicionales

- **Primer inicio**: Render (free tier) apaga los servicios después de 15 min de inactividad. El primer request puede tardar 30-60 segundos en "despertar" el servicio.

- **Repositorio**: Todo el código está documentado y organizado siguiendo principios SOLID y mejores prácticas.

- **Tests**: Backend >80% coverage, Frontend ~70% coverage.

## Contacto

Para cualquier consulta:
- Email: [tu-email@ejemplo.com]
- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
```

---

## 🐛 Problemas Comunes

### "El backend no responde"
- **Causa**: Servicio dormido en Render (free tier)
- **Solución**: Espera 30-60 segundos, se despertará automáticamente

### "CORS error" en el frontend
- **Causa**: URL del backend incorrecta en variables de entorno
- **Solución**: 
  1. Verifica que `VITE_API_URL` tenga la URL correcta del backend
  2. Redespliega el frontend en Render

### "Cannot connect to MongoDB"
- **Causa**: IP no permitida o credenciales incorrectas
- **Solución**:
  1. MongoDB Atlas → Network Access → Allow `0.0.0.0/0`
  2. Verifica que el connection string sea correcto
  3. Verifica que el password no tenga caracteres especiales sin escapar

### "Build failed" en Render
- **Causa**: Dependencias faltantes o error en Dockerfile
- **Solución**: Revisa los logs en Render Dashboard y busca el error específico

---

## 📚 Documentación del Proyecto

- **README.md**: Documentación principal
- **DEPLOYMENT.md**: Guía completa de despliegue
- **GITHUB_SETUP.md**: Cómo subir a GitHub
- **front/README.md**: Documentación del frontend
- **back/README.md**: Documentación del backend

---

## ⏱️ Timeline Estimado

| Tarea | Tiempo Estimado |
|-------|-----------------|
| Subir a GitHub | 10-15 minutos |
| Configurar MongoDB Atlas | 10 minutos |
| Desplegar Backend en Render | 15-20 minutos (build incluido) |
| Desplegar Frontend en Render | 10-15 minutos (build incluido) |
| Agregar colaboradores | 5 minutos |
| Verificar y testear | 10-15 minutos |
| **TOTAL** | **~1 hora** |

---

## ✨ Tips para Impresionar

1. **README profesional**: Ya está hecho, con badges y diagramas
2. **Swagger accesible**: Los evaluadores pueden probar la API sin código
3. **Capturas de pantalla**: Agrega screenshots reales de tu app
4. **Commits descriptivos**: Al hacer cambios, usa mensajes claros
5. **Tests funcionando**: Demuestra calidad del código
6. **Variables de entorno**: Todo configurado correctamente
7. **Documentación completa**: Cada sección del README está clara

---

## 📧 Email de Entrega (Template)

```
Asunto: Entrega Proyecto Full-Stack - Task Management System - [Tu Nombre]

Estimado/a [Nombre Evaluador],

Adjunto los detalles de mi proyecto Full-Stack de Sistema de Gestión de Tareas:

🔗 Repositorio GitHub: https://github.com/TU_USUARIO/task-management-fullstack
🌐 Aplicación desplegada: https://task-app-xxxx.onrender.com
📚 API Docs: https://task-api-xxxx.onrender.com/swagger-ui.html

He agregado su cuenta como colaborador para que pueda revisar el código y los servicios desplegados.

Credenciales de prueba:
- Usuario: admin
- Password: admin123

Stack tecnológico:
- Frontend: React 18 + TypeScript + Redux + Material-UI
- Backend: Spring Boot 3 + Java 21 + MongoDB
- DevOps: Docker + Render

El proyecto incluye:
✅ Autenticación JWT
✅ CRUD completo de tareas
✅ Tablero Kanban con drag & drop
✅ Dashboard con analytics
✅ Tests >80% coverage
✅ Documentación completa (README + Swagger)

Quedo atento a sus comentarios.

Saludos cordiales,
[Tu Nombre]
```

---

**¡Éxito con tu entrega!** 🚀

Si tienes algún problema, consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para troubleshooting detallado.
