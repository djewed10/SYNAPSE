/**
 * RBAC Configuration
 * Defines roles and their associated permissions
 */

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

export const ROLE_PERMISSIONS = {
  admin: [
    'manage:users',
    'manage:content',
    'manage:reports',
    'manage:settings',
    'view:analytics',
    'view:all_data',
  ],
  teacher: [
    'create:content',
    'edit:own_content',
    'view:student_progress',
    'grade:assignments',
    'manage:own_class',
  ],
  student: [
    'view:content',
    'submit:assignments',
    'view:own_progress',
    'view:own_grade',
    'participate:discussions',
  ],
} as const;

export const ROUTE_ROLES: Record<string, string[]> = {
  '/admin': [ROLES.ADMIN],
  '/dashboard': [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
  '/auth/login': [],
  '/auth/register': [],
};
