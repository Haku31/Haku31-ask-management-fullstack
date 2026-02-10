# Arquitectura del Sistema

## 📐 Visión General

Este documento describe la arquitectura del Sistema de Gestión de Tareas, incluyendo decisiones de diseño, patrones utilizados y principios aplicados.

## 🏛️ Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│                    (React Components)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Pages     │  │  Features   │  │   Shared    │    │
│  │             │  │             │  │             │    │
│  │ - Login     │  │ - Auth      │  │ - Layout    │    │
│  │ - Tasks     │  │ - Tasks     │  │ - Navbar    │    │
│  │ - Dashboard │  │             │  │ - ErrorBnd  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│                    (Redux Toolkit)                       │
│  ┌─────────────┐  ┌─────────────┐                      │
│  │  authSlice  │  │ tasksSlice  │                      │
│  │             │  │             │                      │
│  │ - login     │  │ - fetch     │                      │
│  │ - logout    │  │ - create    │                      │
│  │ - checkAuth │  │ - update    │                      │
│  └─────────────┘  │ - delete    │                      │
│                   └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Service Layer                        │
│                   (API Abstraction)                      │
│  ┌─────────────┐  ┌─────────────┐                      │
│  │authService  │  │tasksService │                      │
│  └─────────────┘  └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    HTTP Client Layer                     │
│                       (Axios)                            │
│           - Request interceptors                         │
│           - Response interceptors                        │
│           - Error handling                               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
                    Backend API
```

## 📂 Estructura de Carpetas

### Feature-Based Architecture

La aplicación sigue una arquitectura basada en características, donde cada feature es un módulo independiente y autónomo.

```
src/
├── app/                      # Configuración global
│   ├── store.ts             # Redux store
│   └── hooks.ts             # Typed Redux hooks
│
├── features/                # Features modulares
│   ├── auth/
│   │   ├── authSlice.ts    # Redux slice
│   │   ├── authService.ts  # API service
│   │   ├── types/          # TypeScript types
│   │   └── components/     # Feature components
│   │
│   └── tasks/
│       ├── tasksSlice.ts
│       ├── tasksService.ts
│       ├── types/
│       └── components/
│
├── pages/                   # Page components
│   ├── LoginPage.tsx
│   ├── TasksPage.tsx
│   └── DashboardPage.tsx
│
├── shared/                  # Código compartido
│   ├── components/         # Componentes reutilizables
│   ├── hooks/              # Custom hooks
│   ├── theme/              # MUI theme
│   └── utils/              # Utilidades
│
└── tests/                  # Tests unitarios
    └── [mirrors src structure]
```

## 🎯 Principios SOLID

### 1. Single Responsibility Principle (SRP)

Cada módulo, clase o función tiene una única responsabilidad.

```typescript
// ✅ Bueno: Cada servicio tiene una responsabilidad
class TasksService {
  async getTasks() { /* ... */ }
  async createTask() { /* ... */ }
}

class AuthService {
  async login() { /* ... */ }
  async logout() { /* ... */ }
}

// ❌ Malo: Un servicio hace todo
class ApiService {
  async login() { /* ... */ }
  async getTasks() { /* ... */ }
  async getUsers() { /* ... */ }
}
```

### 2. Open/Closed Principle (OCP)

Los componentes son abiertos para extensión pero cerrados para modificación.

```typescript
// ✅ Bueno: Componente extensible mediante props
interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  ...props 
}) => {
  return <MuiButton variant={variant} color={color} size={size} {...props} />;
};
```

### 3. Liskov Substitution Principle (LSP)

Las interfaces TypeScript garantizan contratos consistentes.

```typescript
// Interfaz base
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

// Implementación específica mantiene el contrato
const task: Task = {
  id: '1',
  title: 'Task',
  status: 'TODO'
};
```

### 4. Interface Segregation Principle (ISP)

Interfaces pequeñas y específicas en lugar de grandes y genéricas.

```typescript
// ✅ Bueno: Interfaces específicas
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => void;
}

// ❌ Malo: Interfaz genérica con props innecesarias
interface TaskComponentProps {
  task?: Task;
  tasks?: Task[];
  onDelete?: (id: string) => void;
  onSubmit?: (data: any) => void;
  onCreate?: () => void;
}
```

### 5. Dependency Inversion Principle (DIP)

Los módulos de alto nivel no dependen de módulos de bajo nivel. Ambos dependen de abstracciones.

```typescript
// Abstracción
interface ITasksService {
  getTasks(): Promise<Task[]>;
  createTask(data: CreateTaskDto): Promise<Task>;
}

// Implementación
class TasksService implements ITasksService {
  async getTasks() { /* ... */ }
  async createTask(data: CreateTaskDto) { /* ... */ }
}

// Componente depende de la abstracción
const TasksPage: React.FC = () => {
  // Usa el servicio a través de Redux que actúa como abstracción
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchTasks()); // No conoce la implementación
  }, []);
};
```

## 🔄 Flujo de Datos

### Redux Toolkit Flow

```
User Action
    │
    ▼
Component
    │
    ▼
dispatch(asyncThunk)
    │
    ▼
Service Layer
    │
    ▼
Axios (API Call)
    │
    ▼
Backend API
    │
    ▼
Response
    │
    ▼
Redux Slice (update state)
    │
    ▼
Component Re-render
    │
    ▼
UI Update
```

### Ejemplo: Crear Tarea

```typescript
// 1. Usuario hace click en "Crear"
<Button onClick={() => setFormOpen(true)}>Nueva Tarea</Button>

// 2. Usuario llena el formulario y submit
const handleSubmit = async (data: CreateTaskDto) => {
  await dispatch(createTask(data)).unwrap();
};

// 3. Async thunk ejecuta el servicio
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: CreateTaskDto) => {
    const task = await tasksService.createTask(taskData);
    return task;
  }
);

// 4. Service hace la llamada HTTP
class TasksService {
  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/tasks', taskData);
    return response.data;
  }
}

// 5. Reducer actualiza el estado
builder.addCase(createTask.fulfilled, (state, action) => {
  state.tasks.push(action.payload);
});

// 6. Componente se re-renderiza con nuevo estado
const { tasks } = useAppSelector((state) => state.tasks);
```

## 🎨 Patrones de Diseño

### 1. Container/Presentational Pattern

```typescript
// Presentational (TaskCard.tsx)
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  // Solo presentación, sin lógica de negocio
  return <Card>...</Card>;
};

// Container (TasksPage.tsx)
export const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.tasks);
  
  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };
  
  return <TaskCard task={task} onDelete={handleDelete} />;
};
```

### 2. Custom Hooks Pattern

```typescript
// useAuth.ts
export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );
  
  return { user, isAuthenticated, loading };
};

// Uso en componente
const MyComponent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  // ...
};
```

### 3. Service Layer Pattern

```typescript
// Abstracción de API calls
class TasksService {
  async getTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  }
}

export const tasksService = new TasksService();
```

### 4. Factory Pattern (Redux Toolkit)

```typescript
// createAsyncThunk es una factory function
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await tasksService.getTasks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## 🔐 Seguridad

### Autenticación

- JWT almacenado en localStorage
- Interceptor Axios agrega token a requests
- Auto-redirect en errores 401
- Protected routes con PrivateRoute component

### Validación

- Client-side con Yup schemas
- Type safety con TypeScript
- Sanitización de inputs

## 🚀 Performance

### Optimizaciones

1. **React.memo** para componentes puros
2. **useMemo** para cálculos costosos
3. **useCallback** para funciones estables
4. **Code splitting** con React.lazy (futuro)
5. **Debounce** en búsquedas

### Estado Mínimo

Redux solo almacena estado global necesario:
- Autenticación (user, token)
- Tareas (tasks, filters)
- UI state local en componentes

## 📊 Gestión de Estado

### Local vs Global

**Estado Local (useState)**
- UI state (modals, forms)
- Temporary data
- Component-specific state

**Estado Global (Redux)**
- Authentication
- Tasks data
- Filters and search
- Shared state

## 🧪 Testing Strategy

### Pirámide de Testing

```
        ┌─────────┐
        │   E2E   │  (Futuro)
        └─────────┘
      ┌─────────────┐
      │ Integration │  (Futuro)
      └─────────────┘
    ┌─────────────────┐
    │  Unit Tests     │  (Actual: >80%)
    └─────────────────┘
```

### Unit Tests Coverage

- Componentes: render, props, user interactions
- Redux: reducers, async thunks, selectors
- Hooks: custom hooks behavior
- Utils: utility functions

## 🔄 CI/CD (Futuro)

```
Push to GitHub
    │
    ▼
Run Tests
    │
    ▼
Lint & Type Check
    │
    ▼
Build
    │
    ▼
Deploy to Staging
    │
    ▼
Manual Approval
    │
    ▼
Deploy to Production
```

## 📈 Escalabilidad

### Preparado para Crecer

1. **Modular Architecture**: Fácil agregar nuevas features
2. **Typed Everything**: TypeScript previene errores
3. **Service Layer**: Fácil cambiar backend
4. **Redux Toolkit**: Estado escalable
5. **Component Library**: Componentes reutilizables

### Próximos Pasos

- Micro-frontends (si crece mucho)
- React Query para cache
- GraphQL en lugar de REST
- Monorepo con shared packages

## 🔧 Herramientas y Tecnologías

### Build Tools
- **Vite**: Fast dev server, HMR
- **TypeScript**: Type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting

### State Management
- **Redux Toolkit**: Global state
- **React Hooks**: Local state

### UI
- **Material-UI**: Component library
- **Framer Motion**: Animations
- **Recharts**: Charts

### Testing
- **Jest**: Test runner
- **React Testing Library**: Component testing

## 📚 Referencias

- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Material-UI Documentation](https://mui.com/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

Última actualización: 2024-01-17
