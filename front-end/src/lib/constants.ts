/**
 * Constants
 * App-wide constants and configuration values
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ACTIVATE: '/auth/activate',
  },
  USERS: {
    ME: '/users/me',
    PROFILE: '/users/:id',
  },
  CONTENT: {
    VOLETS: '/volets',
    MODULES: '/modules',
    LESSONS: '/lessons',
    QCMS: '/qcms',
  },
  STATS: {
    STATISTICS: '/statistics',
    RANKINGS: '/rankings',
  },
} as const;

export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    LOGOUT: 'Logged out successfully',
    REGISTER: 'Registration successful!',
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully',
  },
  ERROR: {
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    REGISTER_FAILED: 'Registration failed. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;
