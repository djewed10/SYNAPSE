/**
 * Zustand Auth Store
 * Manages global authentication state
 */

'use client';

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearAuth: () => set({ user: null, token: null }),
}));
