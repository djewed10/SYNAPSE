/**
 * Rankings Service
 * Handles all rankings and leaderboard related API calls
 */

import { api } from './axios-config';

export interface RankingEntry {
  rank: number;
  userId: string;
  userName: string;
  points: number;
  level: number;
  lessonsCompleted: number;
}

export const rankingsService = {
  getLeaderboard: async (
    timeframe: 'weekly' | 'monthly' | 'all' = 'weekly',
    limit: number = 100
  ): Promise<RankingEntry[]> => {
    const response = await api.get('/rankings/leaderboard', {
      params: { timeframe, limit },
    });
    return response.data;
  },

  getUserRank: async (userId: string, timeframe: 'weekly' | 'monthly' | 'all' = 'weekly'): Promise<RankingEntry> => {
    const response = await api.get(`/rankings/users/${userId}`, {
      params: { timeframe },
    });
    return response.data;
  },

  getMyRank: async (timeframe: 'weekly' | 'monthly' | 'all' = 'weekly'): Promise<RankingEntry> => {
    const response = await api.get('/rankings/me', {
      params: { timeframe },
    });
    return response.data;
  },

  getFriendsLeaderboard: async (limit: number = 50): Promise<RankingEntry[]> => {
    const response = await api.get('/rankings/friends', {
      params: { limit },
    });
    return response.data;
  },
};
