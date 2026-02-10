import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from './constants';
import { mockApiHandlers } from './mockApi';

// Flag para usar Mock API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para Mock API (debe ir primero)
if (USE_MOCK_API) {
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const url = config.url || '';
      const method = config.method?.toLowerCase();

      console.log('🔷 Mock API intercepted:', method, url);

      try {
        // Auth endpoints
        if (url.includes('/auth/login') && method === 'post') {
          const response = await mockApiHandlers.login(config.data);
          return Promise.reject({
            response: { data: response, status: 200 },
            config,
            isAxiosError: false,
            mockResponse: response,
          });
        }

        // Tasks endpoints
        if (url.includes('/tasks')) {
          if (method === 'get' && !url.match(/\/tasks\/\d+/)) {
            const response = await mockApiHandlers.getTasks();
            return Promise.reject({
              response: { data: response, status: 200 },
              config,
              isAxiosError: false,
              mockResponse: response,
            });
          }

          if (method === 'post') {
            const response = await mockApiHandlers.createTask(config.data);
            return Promise.reject({
              response: { data: response, status: 201 },
              config,
              isAxiosError: false,
              mockResponse: response,
            });
          }

          if (method === 'put' && url.includes('/status')) {
            const taskId = url.split('/')[2];
            const response = await mockApiHandlers.updateTaskStatus(taskId, config.data);
            return Promise.reject({
              response: { data: response, status: 200 },
              config,
              isAxiosError: false,
              mockResponse: response,
            });
          }

          if (method === 'delete') {
            const taskId = url.split('/').pop() || '';
            await mockApiHandlers.deleteTask(taskId);
            return Promise.reject({
              response: { data: null, status: 204 },
              config,
              isAxiosError: false,
              mockResponse: null,
            });
          }
        }

        return config;
      } catch (error: any) {
        console.error('Mock API error:', error);
        return Promise.reject(error);
      }
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para manejar respuestas mock
  api.interceptors.response.use(
    (response) => response,
    (error: any) => {
      // Si es una respuesta mock exitosa
      if (error.mockResponse !== undefined && !error.isAxiosError) {
        console.log('✅ Mock API response:', error.response.status);
        return Promise.resolve({ data: error.mockResponse });
      }
      return Promise.reject(error);
    }
  );
}

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

