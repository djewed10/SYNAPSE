/**
 * Modules Service
 * Handles all modules related API calls
 */

import { api } from './axios-config';

export interface Module {
  id: string;
  voletId: string;
  title: string;
  description: string;
  lessons: string[]; // Lesson IDs
  order: number;
  status: 'draft' | 'published';
}

export const modulesService = {
  getModule: async (id: string): Promise<Module> => {
    const response = await api.get(`/modules/${id}`);
    return response.data;
  },

  getVoletModules: async (voletId: string): Promise<Module[]> => {
    const response = await api.get(`/modules/volet/${voletId}`);
    return response.data;
  },

  createModule: async (data: Omit<Module, 'id'>): Promise<Module> => {
    const response = await api.post('/modules', data);
    return response.data;
  },

  updateModule: async (id: string, data: Partial<Module>): Promise<Module> => {
    const response = await api.patch(`/modules/${id}`, data);
    return response.data;
  },

  deleteModule: async (id: string): Promise<void> => {
    await api.delete(`/modules/${id}`);
  },

  getModuleProgress: async (moduleId: string): Promise<{
    moduleId: string;
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  }> => {
    const response = await api.get(`/modules/${moduleId}/progress`);
    return response.data;
  },
};
