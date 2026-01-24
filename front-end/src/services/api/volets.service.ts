/**
 * Volets Service
 * Handles all volets (topics/categories) related API calls
 */

import { api } from './axios-config';

export interface Volet {
  id: string;
  title: string;
  description: string;
  icon?: string;
  modules: string[]; // Module IDs
  status: 'draft' | 'published';
}

export const voletsService = {
  getAllVolets: async (): Promise<Volet[]> => {
    const response = await api.get('/volets');
    return response.data;
  },

  getVolet: async (id: string): Promise<Volet> => {
    const response = await api.get(`/volets/${id}`);
    return response.data;
  },

  createVolet: async (data: Omit<Volet, 'id'>): Promise<Volet> => {
    const response = await api.post('/volets', data);
    return response.data;
  },

  updateVolet: async (id: string, data: Partial<Volet>): Promise<Volet> => {
    const response = await api.patch(`/volets/${id}`, data);
    return response.data;
  },

  deleteVolet: async (id: string): Promise<void> => {
    await api.delete(`/volets/${id}`);
  },

  getVoletProgress: async (voletId: string): Promise<{
    voletId: string;
    completedModules: number;
    totalModules: number;
    completedLessons: number;
    totalLessons: number;
  }> => {
    const response = await api.get(`/volets/${voletId}/progress`);
    return response.data;
  },
};
