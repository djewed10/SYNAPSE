/**
 * useRBAC Hook
 * Provides role-based access control utilities
 */

'use client';

import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';

export function useRBAC() {
  const { user } = useAuth();

  const hasRole = useCallback(
    (role: string) => {
      return user?.roles.includes(role) || false;
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles: string[]) => {
      return user?.roles.some((role) => roles.includes(role)) || false;
    },
    [user]
  );

  const hasAllRoles = useCallback(
    (roles: string[]) => {
      return roles.every((role) => user?.roles.includes(role)) || false;
    },
    [user]
  );

  const canAccess = useCallback(
    (permission: string) => {
      if (!user) return false;

      return user.roles.some((role) => {
        const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
        return permissions?.includes(permission) || false;
      });
    },
    [user]
  );

  const isAdmin = useCallback(() => hasRole('admin'), [hasRole]);
  const isTeacher = useCallback(() => hasRole('teacher'), [hasRole]);
  const isStudent = useCallback(() => hasRole('student'), [hasRole]);

  return {
    user,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    canAccess,
    isAdmin,
    isTeacher,
    isStudent,
  };
}
