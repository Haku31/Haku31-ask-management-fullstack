# 🚀 Quick Start Guide

Guía rápida para comenzar a usar el Sistema de Gestión de Tareas.

## ⚡ Inicio Rápido (5 minutos)

### 1. Clonar e Instalar

```bash
# Clonar el repositorio
git clone <repository-url>
cd front-seek

# Instalar dependencias (ya hecho)
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` o usar `.env.example`:

```bash
# Usar backend real
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=false

# O usar datos mock (sin backend)
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=true
```

### 3. Ejecutar Aplicación

```bash
# Modo desarrollo
npm run dev

# La app estará en http://localhost:3000
```

### 4. Login

Credenciales de prueba (con mock API):
- **Email**: cualquier email válido (ej: admin@test.com)
- **Password**: cualquier contraseña con 6+ caracteres

## 📱 Funcionalidades Principales

### Dashboard
- Ver estadísticas de tareas
- Gráficos de distribución
- Métricas en tiempo real

### Gestión de Tareas
- ✅ Crear nueva tarea
- 📝 Ver listado
- 🔄 Cambiar estado (TODO → IN_PROGRESS → COMPLETED)
- 🗑️ Eliminar tarea
- 🔍 Buscar y filtrar

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 3000)

# Build
npm run build        # Compilar para producción
npm run preview      # Vista previa del build

# Tests
npm test            # Ejecutar tests una vez
npm run test:watch  # Tests en modo watch

# Calidad de Código
npm run lint        # Verificar errores de ESLint
npm run format      # Formatear código con Prettier
```

## 🎯 Estructura del Proyecto

```
src/
├── features/        # Módulos por funcionalidad
│   ├── auth/       # Autenticación
│   └── tasks/      # Gestión de tareas
├── pages/          # Páginas principales
├── shared/         # Código compartido
└── tests/          # Tests unitarios
```

## 🔧 Configuración de Backend

### Con Backend Real

1. Asegúrate de que el backend esté corriendo en `http://localhost:8080`
2. Configura `.env`:
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_USE_MOCK_API=false
   ```

### Sin Backend (Mock)

1. Configura `.env`:
   ```env
   VITE_USE_MOCK_API=true
   ```
2. Los datos de prueba están en `src/shared/utils/mockData.ts`

## 📚 Endpoints Esperados del Backend

```
POST   /auth/login          - Iniciar sesión
GET    /tasks               - Obtener tareas
POST   /tasks               - Crear tarea
PUT    /tasks/:id/status    - Actualizar estado
DELETE /tasks/:id           - Eliminar tarea
```

Ver documentación completa en `docs/API.md`

## 🎨 Características

- ✅ TypeScript para seguridad de tipos
- ✅ Redux Toolkit para estado global
- ✅ Material-UI para UI components
- ✅ React Hook Form + Yup para validación
- ✅ Recharts para gráficos
- ✅ Framer Motion para animaciones
- ✅ Jest + React Testing Library para tests
- ✅ ESLint + Prettier para calidad de código

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verificar que el puerto 3000 esté disponible
# Si está ocupado, Vite te ofrecerá otro puerto automáticamente
```

### Error "Cannot connect to backend"

```bash
# Usar modo mock
# Editar .env y cambiar:
VITE_USE_MOCK_API=true
```

### Tests fallan

```bash
# Limpiar cache y reinstalar
rm -rf node_modules
npm install
npm test
```

## 📖 Documentación Adicional

- `README.md` - Documentación completa
- `docs/ARCHITECTURE.md` - Arquitectura del sistema
- `docs/API.md` - Documentación de API
- `docs/DEPLOYMENT.md` - Guía de deployment
- `CONTRIBUTING.md` - Guía de contribución

## 🎓 Próximos Pasos

1. **Explorar el código**: Revisar `src/` para entender la estructura
2. **Ejecutar tests**: `npm test` para ver la cobertura
3. **Personalizar**: Modificar tema en `src/shared/theme/theme.ts`
4. **Desplegar**: Seguir guía en `docs/DEPLOYMENT.md`

## 📞 Ayuda

¿Problemas o preguntas?
- Revisa la documentación completa en `README.md`
- Consulta `CONTRIBUTING.md` para guías de desarrollo
- Abre un issue en el repositorio

---

**¡Listo para comenzar! 🚀**

```bash
npm run dev
```

Abre http://localhost:3000 y comienza a gestionar tus tareas.
