'use client';

import { cn } from '@/lib/utils';
import { Stethoscope } from 'lucide-react';

interface QCMProgressBarProps {
  current: number;
  total: number;
  correctCount?: number;
  incorrectCount?: number;
  partialCount?: number;
  showStats?: boolean;
  className?: string;
}

export function QCMProgressBar({
  current,
  total,
  correctCount = 0,
  incorrectCount = 0,
  partialCount = 0,
  showStats = true,
  className,
}: QCMProgressBarProps) {
  const answeredCount = correctCount + incorrectCount + partialCount;
  const unansweredCount = total - answeredCount;
  
  // Calculate percentages
  const correctPercent = total > 0 ? (correctCount / total) * 100 : 0;
  const incorrectPercent = total > 0 ? (incorrectCount / total) * 100 : 0;
  const partialPercent = total > 0 ? (partialCount / total) * 100 : 0;
  const unansweredPercent = total > 0 ? (unansweredCount / total) * 100 : 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-3">
        {/* Progress bar */}
        <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="flex h-full">
            {correctPercent > 0 && (
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${correctPercent}%` }}
              />
            )}
            {incorrectPercent > 0 && (
              <div
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${incorrectPercent}%` }}
              />
            )}
            {partialPercent > 0 && (
              <div
                className="bg-amber-400 transition-all duration-500"
                style={{ width: `${partialPercent}%` }}
              />
            )}
            {unansweredPercent > 0 && (
              <div
                className="bg-gray-300 dark:bg-gray-600 transition-all duration-500"
                style={{ width: `${unansweredPercent}%` }}
              />
            )}
          </div>
        </div>

        {/* Counter */}
        {showStats && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)]">
            <span>{current}</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span>{total}</span>
            {/* Stethoscope icon */}
            <Stethoscope className="w-5 h-5 ml-1 text-[var(--primary)] opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
}

export default QCMProgressBar;
