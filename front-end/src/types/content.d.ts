/**
 * Type Definitions - Content
 */

export interface VoletType {
  id: string;
  title: string;
  description: string;
  icon?: string;
  modules: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ModuleType {
  id: string;
  voletId: string;
  title: string;
  description: string;
  lessons: string[];
  order: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface LessonType {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  order: number;
  questions: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface QCMType {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctOption: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
}
