# 📋 Sistema de Gestión de Tareas

Una aplicación frontend profesional para gestionar tareas, construida con React, TypeScript, Redux Toolkit y Material-UI.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0.1-purple)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Características

- 🔐 **Autenticación**: Sistema de login con JWT
- 📝 **CRUD de Tareas**: Crear, leer, actualizar y eliminar tareas
- 🎨 **UI Moderna**: Interfaz profesional con Material-UI
- 📊 **Dashboard**: Visualización de estadísticas con gráficos (Recharts)
- 🔍 **Filtros y Búsqueda**: Filtrar tareas por estado y buscar por título
- 🎭 **Animaciones**: Transiciones suaves con Framer Motion
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Validación de Formularios**: React Hook Form + Yup
- 🧪 **Tests Unitarios**: Jest + React Testing Library
- 🎯 **Principios SOLID**: Arquitectura limpia y mantenible

## 🏗️ Arquitectura

La aplicación sigue una arquitectura modular basada en características (feature-based):

```
src/
├── app/                    # Configuración global
│   ├── store.ts           # Redux store
│   └── hooks.ts           # Hooks tipados
├── features/              # Características de la app
│   ├── auth/             # Autenticación
│   │   ├── authSlice.ts
│   │   ├── authService.ts
│   │   ├── types/
│   │   └── components/
│   └── tasks/            # Gestión de tareas
│       ├── tasksSlice.ts
│       ├── tasksService.ts
│       ├── types/
│       └── components/
├── pages/                # Páginas principales
├── shared/              # Componentes compartidos
│   ├── components/
│   ├── hooks/
│   ├── theme/
│   └── utils/
└── tests/              # Tests unitarios
```

### Principios SOLID Aplicados

- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Open/Closed**: Componentes extensibles mediante props y composition
- **Liskov Substitution**: Interfaces TypeScript consistentes
- **Interface Segregation**: Props específicas por componente
- **Dependency Inversion**: Servicios como capa de abstracción

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd front-seek
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Compila para producción
npm run preview      # Vista previa del build

# Tests
npm test            # Ejecuta tests con cobertura
npm run test:watch  # Ejecuta tests en modo watch

# Linting y Formateo
npm run lint        # Ejecuta ESLint
npm run format      # Formatea código con Prettier
```

## 🔧 Stack Tecnológico

### Core
- **React 18.2** - Librería UI
- **TypeScript 5.3** - Tipado estático
- **Vite 5.0** - Build tool y dev server

### Estado y Datos
- **Redux Toolkit 2.0** - Gestión de estado
- **React Redux 9.0** - Integración Redux-React
- **Axios 1.6** - Cliente HTTP

### UI/UX
- **Material-UI 5.15** - Componentes UI
- **Framer Motion 10.18** - Animaciones
- **Recharts 2.10** - Gráficos y visualizaciones

### Formularios
- **React Hook Form 7.49** - Gestión de formularios
- **Yup 1.3** - Validación de esquemas

### Routing
- **React Router 6.21** - Navegación

### Testing
- **Jest 29.7** - Framework de testing
- **React Testing Library 14.1** - Testing de componentes
- **@testing-library/jest-dom 6.2** - Matchers personalizados

### Code Quality
- **ESLint 8.56** - Linter
- **Prettier 3.1** - Formateador de código
- **TypeScript ESLint 6.18** - Reglas TypeScript

## 🎯 Funcionalidades Principales

### 1. Autenticación

- Login con email y contraseña
- Almacenamiento seguro de JWT
- Protección de rutas privadas
- Redirección automática

### 2. Gestión de Tareas

#### Estados de Tareas
- 🔴 **Por Hacer** (TODO)
- 🟠 **En Progreso** (IN_PROGRESS)
- 🟢 **Completada** (COMPLETED)

#### Operaciones
- ✅ Crear nueva tarea
- 📝 Ver listado de tareas
- 🔄 Actualizar estado
- 🗑️ Eliminar tarea
- 🔍 Buscar por título
- 🎯 Filtrar por estado

### 3. Dashboard

- 📊 Gráfico de barras con distribución de tareas
- 🥧 Gráfico circular con porcentajes
- 📈 Métricas en tiempo real:
  - Total de tareas
  - Tareas por hacer
  - Tareas en progreso
  - Tareas completadas

### 4. Validación de Formularios

#### Tarea Nueva
- **Título**: 3-100 caracteres (requerido)
- **Descripción**: 10-500 caracteres (requerido)
- **Estado**: Enum [TODO, IN_PROGRESS, COMPLETED]

#### Login
- **Email**: Formato de email válido
- **Contraseña**: Mínimo 6 caracteres

## 🧪 Testing

La aplicación incluye tests unitarios con >80% de cobertura:

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Ver reporte de cobertura
npm test -- --coverage
```

### Tipos de Tests

- ✅ **Componentes**: Renderizado y comportamiento
- ✅ **Redux**: Reducers y async thunks
- ✅ **Hooks**: Custom hooks
- ✅ **Utils**: Funciones de utilidad

## 🎨 Temas y Estilos

El proyecto utiliza un tema personalizado de Material-UI:

- **Paleta de colores** profesional
- **Tipografía** consistente
- **Spacing system** de 8px
- **Componentes** personalizados
- **Responsive design** con breakpoints

## 📱 Responsive Design

Breakpoints utilizados:
- **xs**: 0px - 600px (Mobile)
- **sm**: 600px - 900px (Tablet)
- **md**: 900px - 1200px (Laptop)
- **lg**: 1200px - 1536px (Desktop)
- **xl**: 1536px+ (Large Desktop)

## 🔌 API Integration

### Endpoints Esperados

```typescript
POST   /auth/login          // Login
GET    /tasks               // Obtener todas las tareas
POST   /tasks               // Crear tarea
PUT    /tasks/:id/status    // Actualizar estado
DELETE /tasks/:id           // Eliminar tarea
```

### Estructura de Respuestas

#### Login Response
```json
{
  "token": "jwt-token",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### Task Response
```json
{
  "id": "1",
  "title": "Task Title",
  "description": "Task Description",
  "status": "TODO",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Seguridad

- ✅ Token JWT en localStorage
- ✅ Interceptor Axios para autenticación
- ✅ Protección de rutas privadas
- ✅ Manejo de errores 401
- ✅ Validación de formularios
- ✅ Sanitización de inputs

## 🚧 Desarrollo

### Estructura de Componentes

```typescript
// Componente funcional con TypeScript
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Lógica del componente
  return <div>{/* JSX */}</div>;
};
```

### Redux Slice Pattern

```typescript
// Feature slice
export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Reducers síncronos
  },
  extraReducers: (builder) => {
    // Async thunks
  },
});
```

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ como proyecto de demostración de arquitectura frontend profesional.

## 🎯 Roadmap

### Funcionalidades Futuras
- [ ] Dark mode
- [ ] Drag & Drop para cambiar estados
- [ ] Exportar tareas a CSV
- [ ] Paginación o infinite scroll
- [ ] PWA capabilities
- [ ] Notificaciones push
- [ ] Edición inline de tareas
- [ ] Categorías/etiquetas
- [ ] Filtros avanzados
- [ ] Búsqueda avanzada

---

**Nota**: Esta es una aplicación de demostración. Para producción, se recomienda agregar:
- Autenticación OAuth
- Rate limiting
- HTTPS
- Error tracking (Sentry)
- Analytics
- Optimización de performance
- SEO
- Accesibilidad (WCAG)

