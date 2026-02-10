# 📦 Guía: Subir Proyecto a GitHub

Esta guía te llevará paso a paso para subir tu proyecto a GitHub de forma profesional.

## 📋 Requisitos Previos

- [ ] Git instalado: `git --version`
- [ ] Cuenta en GitHub: https://github.com/signup
- [ ] Proyecto completo y funcionando localmente

---

## 🚀 Pasos para Subir a GitHub

### 1. Verificar que Git esté instalado

```powershell
git --version
```

Si no está instalado, descárgalo de: https://git-scm.com/download/win

### 2. Configurar Git (primera vez solamente)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 3. Navegar a tu proyecto

```powershell
cd "C:\Users\asus\Desktop\front seek"
```

### 4. Inicializar repositorio Git

```powershell
# Verificar si ya está inicializado
git status

# Si dice "not a git repository", inicializa:
git init
```

### 5. Verificar archivos a subir

```powershell
# Ver todos los archivos
git status

# IMPORTANTE: Verifica que NO aparezcan:
# - node_modules/
# - .env (archivos de configuración sensible)
# - target/ (compilados de Java)
# - dist/ (builds de frontend)
```

Si aparecen, asegúrate de que `.gitignore` esté configurado correctamente.

### 6. Agregar archivos al staging

```powershell
# Agregar todos los archivos
git add .

# Ver qué se agregó
git status
```

### 7. Crear el primer commit

```powershell
git commit -m "Initial commit: Task Management System Full-Stack"
```

### 8. Crear repositorio en GitHub

1. Ve a https://github.com/
2. Click en el botón **[+]** → **New repository**
3. Configura:
   - **Repository name**: `task-management-fullstack` (o el nombre que prefieras)
   - **Description**: `Full-stack Task Management System with React + Spring Boot + MongoDB`
   - **Visibility**: 
     - ✅ **Public** (para que los evaluadores lo vean)
     - O **Private** (y luego agrega colaboradores)
   - ❌ **NO** marcar "Initialize with README" (ya tienes uno)
   - ❌ **NO** agregar .gitignore ni licencia (ya los tienes)
4. Click en **Create repository**

### 9. Conectar repositorio local con GitHub

GitHub te mostrará comandos. Usa estos:

```powershell
# Renombrar rama principal a "main"
git branch -M main

# Conectar con tu repositorio remoto
git remote add origin https://github.com/TU_USUARIO/task-management-fullstack.git

# Verificar que se agregó correctamente
git remote -v
```

### 10. Subir código a GitHub

```powershell
# Subir todo a GitHub
git push -u origin main
```

GitHub te pedirá autenticación:
- **Opción 1**: Usa tu **Personal Access Token** (recomendado)
- **Opción 2**: Usa **GitHub CLI** (`gh auth login`)

**¿Cómo crear un Personal Access Token?**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Scopes: Marca `repo` (full control)
4. Genera y copia el token
5. Úsalo como password cuando Git te pida

### 11. Verificar en GitHub

1. Ve a `https://github.com/TU_USUARIO/task-management-fullstack`
2. Deberías ver todos tus archivos
3. Verifica que el README.md se vea correctamente

---

## 🎨 Personalizar el README (Opcional pero recomendado)

Actualiza el README con información específica de tu proyecto:

1. **Reemplaza URLs de demo**:
   ```markdown
   - **Frontend**: https://tu-app.vercel.app
   - **Backend API**: https://tu-api.onrender.com
   - **Swagger Docs**: https://tu-api.onrender.com/swagger-ui.html
   ```

2. **Agrega capturas de pantalla**:
   - Toma screenshots de tu aplicación
   - Sube a `assets/screenshots/` en el repo
   - O usa servicios como Imgur
   - Reemplaza los placeholders en el README

3. **Actualiza sección de instalación** si cambiaste algo

---

## 👥 Agregar Colaboradores (Para Evaluadores)

### Opción 1: Repositorio Público (Recomendado)
Si tu repo es público, simplemente comparte el link:
```
https://github.com/TU_USUARIO/task-management-fullstack
```

### Opción 2: Repositorio Privado
1. Ve a tu repositorio en GitHub
2. **Settings** → **Collaborators**
3. Click en **Add people**
4. Ingresa el username o email del evaluador
5. Click en **Add [nombre] to this repository**

---

## 📝 Comandos Git Útiles para el Futuro

### Hacer cambios y subirlos

```powershell
# 1. Ver archivos modificados
git status

# 2. Agregar cambios
git add .

# 3. Crear commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push
```

### Ver historial

```powershell
git log --oneline
```

### Crear una nueva rama (feature)

```powershell
git checkout -b feature/nueva-funcionalidad
# Hacer cambios...
git add .
git commit -m "Agregar nueva funcionalidad"
git push -u origin feature/nueva-funcionalidad
```

### Actualizar desde GitHub

```powershell
git pull
```

---

## 🐛 Solución de Problemas

### Error: "failed to push some refs"

**Problema**: Alguien hizo cambios en GitHub que no tienes localmente

**Solución**:
```powershell
git pull --rebase origin main
git push
```

### Error: "repository not found"

**Problema**: URL del repositorio incorrecta

**Solución**:
```powershell
# Ver URL actual
git remote -v

# Cambiar URL
git remote set-url origin https://github.com/TU_USUARIO_CORRECTO/task-management-fullstack.git
```

### Error: "Authentication failed"

**Problema**: Token expirado o credenciales incorrectas

**Solución**:
1. Genera un nuevo Personal Access Token en GitHub
2. Windows: Ve a "Administrador de credenciales" y elimina las de GitHub
3. Intenta push de nuevo, ingresa el nuevo token

### Archivos grandes o node_modules se subieron

**Problema**: .gitignore no funcionó correctamente

**Solución**:
```powershell
# Remover de Git pero mantener localmente
git rm -r --cached node_modules
git rm -r --cached front/node_modules
git rm -r --cached back/target

# Commit cambios
git commit -m "Remove unnecessary files"
git push
```

---

## ✅ Checklist Final

Antes de compartir tu repositorio con evaluadores:

- [ ] Repositorio creado en GitHub
- [ ] Código subido completamente
- [ ] README.md se ve correctamente en GitHub
- [ ] .gitignore funciona (no hay node_modules, .env, etc.)
- [ ] Badges en el README funcionan
- [ ] URLs de demo actualizadas (si ya desplegaste)
- [ ] Colaboradores agregados (si el repo es privado)
- [ ] Licencia agregada (opcional: MIT es común)
- [ ] Descripción y tags del repo configurados

### Configurar descripción y tags en GitHub

1. Ve a tu repositorio
2. Click en ⚙️ al lado de "About"
3. Agrega:
   - **Description**: `Full-stack Task Management System with React, TypeScript, Spring Boot, Java, and MongoDB`
   - **Website**: URL de tu app desplegada
   - **Topics**: `react`, `typescript`, `spring-boot`, `java`, `mongodb`, `docker`, `fullstack`, `task-management`
4. Save

---

## 🎓 Recursos Adicionales

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Markdown Guide](https://www.markdownguide.org/)

---

**¡Listo!** Tu proyecto ya está en GitHub de forma profesional. 🎉

**Siguiente paso**: Ve a [DEPLOYMENT.md](./DEPLOYMENT.md) para desplegar tu aplicación en la nube.
