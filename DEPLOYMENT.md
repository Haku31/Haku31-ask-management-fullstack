# 🚀 Guía de Despliegue - Task Management System

Este documento explica cómo desplegar la aplicación completa en servicios cloud gratuitos.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Despliegue en Render](#despliegue-en-render-recomendado)
- [Despliegue en Vercel + Render](#despliegue-en-vercel--render)
- [Despliegue en AWS EC2](#despliegue-en-aws-ec2)
- [Configuración de MongoDB Atlas](#configuración-de-mongodb-atlas)
- [Variables de Entorno](#variables-de-entorno)
- [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Requisitos Previos

1. Cuenta en GitHub
2. Cuenta en MongoDB Atlas (gratis): https://www.mongodb.com/cloud/atlas/register
3. Cuenta en **Render** (gratis): https://render.com/
4. O cuenta en **Vercel** (gratis): https://vercel.com/

---

## 📊 Arquitectura de Despliegue Recomendada

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Frontend (Vercel/Render)                          │
│  React + TypeScript                                │
│  ↓                                                  │
│  Backend API (Render)                              │
│  Spring Boot + Java 21                             │
│  ↓                                                  │
│  Database (MongoDB Atlas)                          │
│  Managed MongoDB (512MB gratis)                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Opción 1: Despliegue en Render (Recomendado - TODO EN UNO)

### Paso 1: Configurar MongoDB Atlas

1. Ve a https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratuita
3. Crea un cluster (selecciona FREE TIER)
4. Ve a **Database Access** → **Add New Database User**
   - Usuario: `taskapp`
   - Password: Genera uno seguro y guárdalo
5. Ve a **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (0.0.0.0/0)
6. Ve a **Databases** → **Connect** → **Connect your application**
7. Copia la cadena de conexión:
   ```
   mongodb+srv://taskapp:<password>@cluster0.xxxxx.mongodb.net/tasks?retryWrites=true&w=majority
   ```
   Reemplaza `<password>` con tu password

### Paso 2: Preparar el Repositorio

```bash
# Asegúrate de estar en la raíz del proyecto
cd "C:\Users\asus\Desktop\front seek"

# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Crear commit
git commit -m "Initial commit: Full-stack Task Management System"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/task-management-system.git
git branch -M main
git push -u origin main
```

### Paso 3: Desplegar Backend en Render

1. Ve a https://render.com/
2. **Sign up** y conecta tu cuenta de GitHub
3. Click en **New +** → **Web Service**
4. Selecciona tu repositorio `task-management-system`
5. Configura:
   - **Name**: `task-management-api`
   - **Region**: US East (o el más cercano)
   - **Branch**: `main`
   - **Root Directory**: `back`
   - **Runtime**: `Docker`
   - **Build Command**: (dejar vacío, usa Dockerfile)
   - **Start Command**: (dejar vacío, usa Dockerfile)
   - **Instance Type**: `Free`

6. **Environment Variables** (muy importante):
   ```
   MONGODB_URI=mongodb+srv://taskapp:TU_PASSWORD@cluster0.xxxxx.mongodb.net/tasks?retryWrites=true&w=majority
   MONGODB_DATABASE=tasks
   JWT_SECRET=tu-super-secreto-seguro-cambiame-12345678901234567890
   JWT_EXPIRATION=86400000
   SPRING_PROFILES_ACTIVE=prod
   ```

7. Click en **Create Web Service**
8. Espera 5-10 minutos para el despliegue
9. Copia la URL de tu backend: `https://task-management-api-xxxx.onrender.com`

### Paso 4: Desplegar Frontend en Render

1. En Render, click en **New +** → **Static Site**
2. Selecciona el mismo repositorio
3. Configura:
   - **Name**: `task-management-app`
   - **Branch**: `main`
   - **Root Directory**: `front`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://task-management-api-xxxx.onrender.com/api
   VITE_USE_MOCK_API=false
   ```

5. Click en **Create Static Site**
6. Tu app estará en: `https://task-management-app.onrender.com`

---

## 🌐 Opción 2: Vercel (Frontend) + Render (Backend)

### Backend en Render
Sigue los pasos 3 del apartado anterior.

### Frontend en Vercel

1. Ve a https://vercel.com/
2. **Sign up** con GitHub
3. **Import Project** → Selecciona tu repositorio
4. Configura:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `front`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://task-management-api-xxxx.onrender.com/api
   VITE_USE_MOCK_API=false
   ```

6. Click en **Deploy**
7. Tu app estará en: `https://task-management-app.vercel.app`

---

## ☁️ Opción 3: AWS EC2 (Free Tier)

### Requisitos
- Cuenta AWS con Free Tier activo
- Conocimientos básicos de Linux

### Pasos

1. **Crear instancia EC2**:
   - Tipo: `t2.micro` (Free Tier)
   - AMI: Ubuntu Server 22.04 LTS
   - Security Group: Abrir puertos 22, 80, 443, 8080

2. **Conectar por SSH**:
   ```bash
   ssh -i tu-clave.pem ubuntu@tu-ec2-ip
   ```

3. **Instalar Docker**:
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   ```

4. **Clonar repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/task-management-system.git
   cd task-management-system
   ```

5. **Configurar variables de entorno**:
   ```bash
   # Crear archivo .env en la raíz
   cat > .env << EOF
   MONGODB_URI=mongodb+srv://taskapp:PASSWORD@cluster0.xxxxx.mongodb.net/tasks
   JWT_SECRET=tu-super-secreto-seguro
   JWT_EXPIRATION=86400000
   EOF
   ```

6. **Desplegar**:
   ```bash
   docker-compose up -d
   ```

7. **Configurar dominio** (opcional):
   - Usa Route 53 o un dominio externo
   - Configura Nginx como reverse proxy

---

## 🔐 Variables de Entorno

### Backend (Spring Boot)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGODB_URI` | Cadena de conexión MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `MONGODB_DATABASE` | Nombre de la base de datos | `tasks` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `my-super-secret-key-12345678901234567890` |
| `JWT_EXPIRATION` | Tiempo de expiración JWT (ms) | `86400000` (24 horas) |
| `SPRING_PROFILES_ACTIVE` | Perfil de Spring Boot | `prod` |

### Frontend (React)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend | `https://api.tudominio.com/api` |
| `VITE_USE_MOCK_API` | Usar API mock (dev) | `false` |

---

## 🐛 Solución de Problemas

### Backend no se conecta a MongoDB

**Problema**: Error de conexión a MongoDB Atlas

**Solución**:
1. Verifica que la IP `0.0.0.0/0` esté permitida en Network Access
2. Verifica que el usuario y password sean correctos
3. Asegúrate de reemplazar `<password>` en la cadena de conexión

### Frontend no se conecta al Backend

**Problema**: Error CORS o 404

**Solución**:
1. Verifica que `VITE_API_URL` tenga la URL correcta del backend
2. Verifica que el backend esté corriendo: `curl https://tu-backend.com/actuator/health`
3. Verifica la configuración CORS en `SecurityConfig.java`

### Despliegue en Render tarda mucho

**Problema**: El build toma más de 15 minutos

**Solución**:
- Es normal la primera vez (descarga dependencias)
- Render usa cache en builds siguientes
- En Free Tier, los servicios duermen después de 15 minutos sin uso

### Backend devuelve 502 Bad Gateway

**Problema**: Render no puede iniciar el backend

**Solución**:
1. Revisa los logs en Render Dashboard
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el Dockerfile funcione localmente: `docker build -t test .`

---

## 📊 Verificación del Despliegue

### 1. Verificar Backend

```bash
# Health check
curl https://tu-backend.onrender.com/actuator/health

# Swagger UI
# Abre en navegador: https://tu-backend.onrender.com/swagger-ui.html
```

### 2. Verificar Frontend

1. Abre `https://tu-frontend.vercel.app`
2. Intenta registrar un usuario
3. Inicia sesión
4. Crea una tarea

### 3. Verificar MongoDB

1. Ve a MongoDB Atlas Dashboard
2. **Collections** → Verifica que existan las colecciones `users` y `tasks`
3. Debería haber datos después de usar la app

---

## 🎓 Dar Acceso a Colaboradores

### GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** → **Collaborators**
3. **Add people** → Ingresa el email o username del evaluador

### Render

1. Ve a tu Dashboard de Render
2. Click en el servicio (backend o frontend)
3. **Settings** → **Team** → **Invite Team Member**

### MongoDB Atlas

1. Ve a tu cluster en MongoDB Atlas
2. **Access Manager** → **Invite Users**
3. Asigna rol **Project Read Only**

### Vercel (si usas)

1. Ve a tu proyecto en Vercel
2. **Settings** → **Members** → **Invite**

---

## 💡 Tips Profesionales

1. **Usa nombres descriptivos**: `task-management-api`, no `backend`
2. **README completo**: Incluye capturas de pantalla, arquitectura, etc.
3. **Documentación API**: El Swagger debe estar accesible públicamente
4. **Monitoreo**: Configura notificaciones de errores en Render
5. **HTTPS**: Render y Vercel dan HTTPS gratis
6. **Custom Domain**: Considera comprar un dominio (opcional pero profesional)

---

## 📚 Recursos Adicionales

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Spring Boot Deployment](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## ✅ Checklist Final

Antes de entregar, verifica:

- [ ] Repositorio GitHub configurado y público
- [ ] README.md completo con badges, capturas, instrucciones
- [ ] Backend desplegado y funcionando
- [ ] Frontend desplegado y funcionando
- [ ] MongoDB Atlas configurado
- [ ] Swagger UI accesible públicamente
- [ ] Colaboradores agregados con permisos de lectura
- [ ] Todas las funcionalidades principales funcionan
- [ ] CORS configurado correctamente
- [ ] Variables de entorno configuradas
- [ ] Sin datos sensibles en el repositorio
- [ ] Docker Compose funciona localmente
- [ ] Tests pasan correctamente

---

**¡Buena suerte con tu despliegue!** 🚀
