/**
 * Statistics Service
 * Handles all user statistics and analytics API calls
 */

import { api } from './axios-config';

export interface UserStatistics {
  userId: string;
  totalPoints: number;
  lessonsCompleted: number;
  currentStreak: number;
  accuracy: number;
  level: number;
  rank: number;
}

export interface ProgressData {
  date: string;
  pointsEarned: number;
  lessonsCompleted: number;
}

export interface PerformanceByCategory {
  category: string;
  accuracy: number;
  lessonsCompleted: number;
  pointsEarned: number;
}

export const statisticsService = {
  getUserStatistics: async (userId: string): Promise<UserStatistics> => {
    const response = await api.get(`/statistics/users/${userId}`);
    return response.data;
  },

  getMyStatistics: async (): Promise<UserStatistics> => {
    const response = await api.get('/statistics/me');
    return response.data;
  },

  getProgressOverTime: async (userId: string, timeframe: 'week' | 'month' | 'year'): Promise<ProgressData[]> => {
    const response = await api.get(`/statistics/users/${userId}/progress`, {
      params: { timeframe },
    });
    return response.data;
  },

  getPerformanceByCategory: async (userId: string): Promise<PerformanceByCategory[]> => {
    const response = await api.get(`/statistics/users/${userId}/by-category`);
    return response.data;
  },

  getLeaderboard: async (timeframe: 'week' | 'month' | 'all' = 'week', limit: number = 50) => {
    const response = await api.get('/statistics/leaderboard', {
      params: { timeframe, limit },
    });
    return response.data;
  },
};
