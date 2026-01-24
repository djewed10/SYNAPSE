/**
 * Users Service
 * Handles all user-related API calls
 */

import { api } from './axios-config';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: File;
}

export const usersService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  getMyProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const formData = new FormData();
    if (data.firstName) formData.append('firstName', data.firstName);
    if (data.lastName) formData.append('lastName', data.lastName);
    if (data.bio) formData.append('bio', data.bio);
    if (data.avatar) formData.append('avatar', data.avatar);

    const response = await api.patch('/users/me', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.post('/users/me/change-password', { currentPassword, newPassword });
  },

  getAllUsers: async (page: number = 1, limit: number = 50) => {
    const response = await api.get('/users', {
      params: { page, limit },
    });
    return response.data;
  },
};
