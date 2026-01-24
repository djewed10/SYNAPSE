/**
 * Lessons Service
 * Handles all lessons related API calls
 */

import { api } from './axios-config';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  order: number;
  status: 'draft' | 'published';
  questions: string[]; // QCM IDs
}

export const lessonsService = {
  getLesson: async (id: string): Promise<Lesson> => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  getModuleLessons: async (moduleId: string): Promise<Lesson[]> => {
    const response = await api.get(`/lessons/module/${moduleId}`);
    return response.data;
  },

  createLesson: async (data: Omit<Lesson, 'id'>): Promise<Lesson> => {
    const response = await api.post('/lessons', data);
    return response.data;
  },

  updateLesson: async (id: string, data: Partial<Lesson>): Promise<Lesson> => {
    const response = await api.patch(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: string): Promise<void> => {
    await api.delete(`/lessons/${id}`);
  },

  markAsComplete: async (id: string): Promise<void> => {
    await api.post(`/lessons/${id}/complete`);
  },
};
