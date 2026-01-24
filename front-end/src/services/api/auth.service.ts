/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import { api } from './axios-config';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  activateAccount: async (code: string): Promise<void> => {
    await api.post('/auth/activate', { code });
  },

  resetPassword: async (email: string): Promise<void> => {
    await api.post('/auth/reset-password-request', { email });
  },

  confirmResetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password-confirm', { token, newPassword });
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
