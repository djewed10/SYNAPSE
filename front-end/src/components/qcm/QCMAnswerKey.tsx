'use client';

import { cn } from '@/lib/utils';
import type { QCMProposition } from '@/types/qcm';

interface QCMAnswerKeyProps {
  propositions: QCMProposition[];
  correctAnswers: string[];
  selectedAnswers: string[];
  isRevealed: boolean;
}

// Letter mapping for options
const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function QCMAnswerKey({
  propositions,
  correctAnswers,
  selectedAnswers,
  isRevealed,
}: QCMAnswerKeyProps) {
  if (!isRevealed) return null;

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      {/* Letters row */}
      <div className="flex items-center gap-2">
        {propositions.map((prop, index) => (
          <span
            key={`letter-${prop.id}`}
            className="w-6 text-center text-sm font-bold text-[var(--text-primary)]"
          >
            {optionLetters[index]}
          </span>
        ))}
      </div>
      
      {/* Status row */}
      <div className="flex items-center gap-2">
        {propositions.map((prop) => {
          const isCorrect = correctAnswers.includes(prop.id);
          const isSelected = selectedAnswers.includes(prop.id);
          
          // Determine the mark to show
          let mark: 'check' | 'cross' | 'empty' = 'empty';
          if (isCorrect) {
            mark = 'check';
          } else if (isSelected && !isCorrect) {
            mark = 'cross';
          }

          return (
            <div
              key={`status-${prop.id}`}
              className={cn(
                'w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold',
                mark === 'check' && 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                mark === 'cross' && 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                mark === 'empty' && 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]'
              )}
            >
              {mark === 'check' && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {mark === 'cross' && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QCMAnswerKey;
