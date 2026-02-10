# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-01-17

### Agregado

#### Autenticación
- Sistema de login con validación de credenciales
- Almacenamiento seguro de JWT en localStorage
- Protección de rutas privadas
- Auto-redirect cuando no está autenticado
- Funcionalidad de logout

#### Gestión de Tareas
- CRUD completo de tareas
- Estados: Por Hacer, En Progreso, Completada
- Filtros por estado
- Búsqueda por título con debounce
- Validación de formularios con Yup
- Confirmación antes de eliminar
- Animaciones suaves con Framer Motion

#### Dashboard
- Gráfico de barras con distribución de tareas
- Gráfico circular con porcentajes
- Cards de estadísticas:
  - Total de tareas
  - Tareas por hacer
  - Tareas en progreso
  - Tareas completadas

#### UI/UX
- Tema personalizado de Material-UI
- Diseño responsive (mobile-first)
- Navbar con navegación
- Loading states con skeletons
- Notificaciones toast (Snackbar)
- Error boundary para errores de React
- Iconos de Material Icons

#### Arquitectura
- Redux Toolkit para estado global
- Feature-based architecture
- Typed hooks para Redux
- Services layer para API calls
- Principios SOLID aplicados
- Separación de concerns

#### Testing
- Configuración de Jest
- React Testing Library
- Tests unitarios para:
  - Componentes (TaskCard)
  - Redux slices (auth, tasks)
  - Custom hooks (useAuth)
- Cobertura de código configurada (80%)

#### Desarrollo
- ESLint configurado
- Prettier para formateo
- TypeScript strict mode
- Vite como build tool
- Hot Module Replacement
- Path aliases (@/)

#### Documentación
- README completo
- Guía de contribución
- Licencia MIT
- Comentarios en código
- JSDoc para funciones complejas

### Dependencias Principales

- React 18.2.0
- TypeScript 5.3.3
- Redux Toolkit 2.0.1
- Material-UI 5.15.0
- React Router 6.21.1
- Axios 1.6.5
- Recharts 2.10.3
- React Hook Form 7.49.3
- Yup 1.3.3
- Framer Motion 10.18.0

### Notas de Desarrollo

- Configuración de Vite optimizada
- Variables de entorno con VITE_ prefix
- Interceptores Axios para autenticación
- Mock data para desarrollo
- TypeScript paths configurados

## [Unreleased]

### Por Hacer

#### Funcionalidades
- [ ] Dark mode toggle
- [ ] Drag & drop para cambiar estados
- [ ] Exportar tareas a CSV
- [ ] Paginación o infinite scroll
- [ ] PWA capabilities
- [ ] Edición inline de tareas
- [ ] Categorías/etiquetas
- [ ] Fechas de vencimiento
- [ ] Prioridades de tareas
- [ ] Notificaciones push

#### Mejoras
- [ ] Optimistic updates completos
- [ ] Cache de datos con React Query
- [ ] Lazy loading de rutas
- [ ] Code splitting
- [ ] Performance optimizations
- [ ] SEO meta tags
- [ ] Accesibilidad (WCAG 2.1 AA)
- [ ] Internacionalización (i18n)

#### Testing
- [ ] E2E tests con Playwright
- [ ] Integration tests
- [ ] Visual regression tests
- [ ] Performance testing
- [ ] Aumentar cobertura a 90%

#### DevOps
- [ ] CI/CD pipeline
- [ ] Docker configuration
- [ ] Kubernetes manifests
- [ ] Error tracking (Sentry)
- [ ] Analytics (GA)
- [ ] Monitoring

#### Documentación
- [ ] Storybook para componentes
- [ ] API documentation
- [ ] Video tutoriales
- [ ] Arquitectura diagrams
- [ ] Deployment guide

---

## Guía de Versiones

### Formato: [MAJOR.MINOR.PATCH]

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nueva funcionalidad compatible
- **PATCH**: Correcciones de bugs compatibles

### Tipos de Cambios

- **Agregado**: para nuevas funcionalidades
- **Cambiado**: para cambios en funcionalidad existente
- **Obsoleto**: para funcionalidades que serán removidas
- **Removido**: para funcionalidades removidas
- **Corregido**: para correcciones de bugs
- **Seguridad**: para vulnerabilidades
