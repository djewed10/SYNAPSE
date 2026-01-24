/**
 * QCM Service
 * Handles all QCM (Multiple Choice Questions) related API calls
 */

import { api } from './axios-config';

export interface QCMQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctOption: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface QCMAnswer {
  questionId: string;
  selectedOption: number;
}

export interface QCMResult {
  questionId: string;
  isCorrect: boolean;
  earnedPoints: number;
}

export const qcmsService = {
  getQuestion: async (id: string): Promise<QCMQuestion> => {
    const response = await api.get(`/qcms/${id}`);
    return response.data;
  },

  getLessonQuestions: async (lessonId: string): Promise<QCMQuestion[]> => {
    const response = await api.get(`/qcms/lesson/${lessonId}`);
    return response.data;
  },

  submitAnswer: async (lessonId: string, answers: QCMAnswer[]): Promise<QCMResult[]> => {
    const response = await api.post(`/qcms/lessons/${lessonId}/submit`, { answers });
    return response.data;
  },

  createQuestion: async (data: Omit<QCMQuestion, 'id'>): Promise<QCMQuestion> => {
    const response = await api.post('/qcms', data);
    return response.data;
  },

  updateQuestion: async (id: string, data: Partial<QCMQuestion>): Promise<QCMQuestion> => {
    const response = await api.patch(`/qcms/${id}`, data);
    return response.data;
  },

  deleteQuestion: async (id: string): Promise<void> => {
    await api.delete(`/qcms/${id}`);
  },
};
