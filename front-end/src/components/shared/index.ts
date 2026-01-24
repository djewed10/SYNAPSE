'use client';

import { ReactNode } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn('animate-spin rounded-full border-b-2 border-blue-500', sizeMap[size])} />
  );
}

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = 'Error', message }: ErrorMessageProps) {
  return (
    <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
      <h3 className="font-bold text-red-200">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}

interface SuccessMessageProps {
  title?: string;
  message: string;
}

export function SuccessMessage({ title = 'Success', message }: SuccessMessageProps) {
  return (
    <div className="bg-green-900 border border-green-700 rounded-lg p-4 text-green-100">
      <h3 className="font-bold text-green-200">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon = '📭', action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {description && <p className="text-gray-400 mb-6">{description}</p>}
      {action}
    </div>
  );
}
