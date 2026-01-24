/**
 * useAuth Hook
 * Provides access to authentication state and methods
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth.service';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuth() {
  const router = useRouter();
  const { user, token, setUser, setToken, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setToken(storedToken);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, setToken, clearAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.login({ email, password });
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        setUser(response.user);
        setToken(response.accessToken);
        router.push('/dashboard');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router, setUser, setToken]
  );

  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.register({ email, password, firstName, lastName });
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        setUser(response.user);
        setToken(response.accessToken);
        router.push('/dashboard');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router, setUser, setToken]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearAuth();
      router.push('/login');
    }
  }, [router, clearAuth]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    register,
    logout,
  };
}
