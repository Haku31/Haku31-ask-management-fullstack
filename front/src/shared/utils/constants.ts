export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export const TASK_STATUS_LABELS = {
  TODO: 'Por Hacer',
  IN_PROGRESS: 'En Progreso',
  COMPLETED: 'Completada',
} as const;

export const TASK_STATUS_COLORS = {
  TODO: '#f44336',
  IN_PROGRESS: '#ff9800',
  COMPLETED: '#4caf50',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  TASKS: '/tasks',
  DASHBOARD: '/dashboard',
} as const;

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

