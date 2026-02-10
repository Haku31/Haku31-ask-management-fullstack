import { mockTasks, mockUser, mockToken } from './mockData';
import { Task, CreateTaskDto, UpdateTaskStatusDto } from '@/features/tasks/types/task.types';
import { LoginCredentials, LoginResponse } from '@/features/auth/types/auth.types';

// Flag para activar/desactivar mock API
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

let tasksDatabase = [...mockTasks];

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API handlers
export const mockApiHandlers = {
  // Auth
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await delay(500);
    
    // Cualquier username/password válido funciona en modo mock
    if (credentials.username && credentials.password.length >= 6) {
      return {
        token: mockToken,
        tokenType: 'Bearer',
        userId: mockUser.userId,
        username: mockUser.username,
        email: mockUser.email,
      };
    }
    
    throw new Error('Credenciales inválidas');
  },

  // Tasks
  getTasks: async (): Promise<Task[]> => {
    await delay(300);
    return [...tasksDatabase];
  },

  createTask: async (taskData: CreateTaskDto): Promise<Task> => {
    await delay(400);
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'TODO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    tasksDatabase.push(newTask);
    return newTask;
  },

  updateTaskStatus: async (taskId: string, statusData: UpdateTaskStatusDto): Promise<Task> => {
    await delay(300);
    
    const taskIndex = tasksDatabase.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Tarea no encontrada');
    }
    
    tasksDatabase[taskIndex] = {
      ...tasksDatabase[taskIndex],
      status: statusData.status,
      updatedAt: new Date().toISOString(),
    };
    
    return tasksDatabase[taskIndex];
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await delay(300);
    
    const taskIndex = tasksDatabase.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Tarea no encontrada');
    }
    
    tasksDatabase = tasksDatabase.filter((t) => t.id !== taskId);
  },
};
