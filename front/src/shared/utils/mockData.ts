import { Task } from '@/features/tasks/types/task.types';
import { User } from '@/features/auth/types/auth.types';

// Mock de tareas para desarrollo
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticación',
    description: 'Crear sistema de login con JWT y validación de credenciales',
    status: 'COMPLETED',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-16T14:30:00.000Z',
  },
  {
    id: '2',
    title: 'Diseñar dashboard',
    description: 'Crear interfaz de dashboard con gráficos y estadísticas de tareas',
    status: 'IN_PROGRESS',
    createdAt: '2024-01-16T09:00:00.000Z',
    updatedAt: '2024-01-17T11:20:00.000Z',
  },
  {
    id: '3',
    title: 'Configurar Redux',
    description: 'Implementar Redux Toolkit para gestión de estado global',
    status: 'COMPLETED',
    createdAt: '2024-01-14T08:00:00.000Z',
    updatedAt: '2024-01-15T09:45:00.000Z',
  },
  {
    id: '4',
    title: 'Tests unitarios',
    description: 'Escribir tests con Jest y React Testing Library para componentes principales',
    status: 'TODO',
    createdAt: '2024-01-17T13:00:00.000Z',
    updatedAt: '2024-01-17T13:00:00.000Z',
  },
  {
    id: '5',
    title: 'Validación de formularios',
    description: 'Implementar validación con React Hook Form y Yup',
    status: 'COMPLETED',
    createdAt: '2024-01-15T14:00:00.000Z',
    updatedAt: '2024-01-16T10:15:00.000Z',
  },
  {
    id: '6',
    title: 'Responsive design',
    description: 'Asegurar que todos los componentes sean responsive en mobile y tablet',
    status: 'IN_PROGRESS',
    createdAt: '2024-01-16T15:00:00.000Z',
    updatedAt: '2024-01-17T12:30:00.000Z',
  },
  {
    id: '7',
    title: 'Documentación',
    description: 'Completar README con instrucciones de instalación y uso',
    status: 'TODO',
    createdAt: '2024-01-17T14:00:00.000Z',
    updatedAt: '2024-01-17T14:00:00.000Z',
  },
  {
    id: '8',
    title: 'Optimización de performance',
    description: 'Implementar lazy loading y code splitting para mejorar tiempos de carga',
    status: 'TODO',
    createdAt: '2024-01-17T15:00:00.000Z',
    updatedAt: '2024-01-17T15:00:00.000Z',
  },
];

// Mock de usuario para desarrollo
export const mockUser: User = {
  userId: '65f1a2b3c4d5e6f7g8h9i0j1',
  username: 'testuser',
  email: 'admin@taskmanager.com',
};

// Mock token
export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.mock';
