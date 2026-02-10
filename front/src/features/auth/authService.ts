import { api } from '@/shared/utils/api';
import { LoginCredentials, LoginResponse } from './types/auth.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  }

  logout(): void {
    // Aquí podrías hacer una llamada al backend para invalidar el token
    // await api.post('/auth/logout');
  }
}

export const authService = new AuthService();

