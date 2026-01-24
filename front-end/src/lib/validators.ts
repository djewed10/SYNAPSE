/**
 * Form Validators (Zod Schemas)
 * Validation schemas for forms using Zod
 */

import { z } from 'zod';
import { VALIDATION } from './constants';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z
      .string()
      .min(VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
      .max(VALIDATION.NAME_MAX_LENGTH, `First name must be at most ${VALIDATION.NAME_MAX_LENGTH} characters`),
    lastName: z
      .string()
      .min(VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
      .max(VALIDATION.NAME_MAX_LENGTH, `Last name must be at most ${VALIDATION.NAME_MAX_LENGTH} characters`),
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `First name must be at most ${VALIDATION.NAME_MAX_LENGTH} characters`)
    .optional(),
  lastName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Last name must be at most ${VALIDATION.NAME_MAX_LENGTH} characters`)
    .optional(),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const voletSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),
  icon: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export type VoletFormData = z.infer<typeof voletSchema>;

export const moduleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['draft', 'published']),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

export const lessonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  status: z.enum(['draft', 'published']),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
