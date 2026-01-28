'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QCMProposition } from '@/types/qcm';

interface QCMOptionProps {
  option: QCMProposition;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  explanation?: string;
  modeExplication: boolean;
  disabled?: boolean;
  onToggle: (optionId: string) => void;
}

// Letter mapping for options
const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function QCMOption({
  option,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  explanation,
  modeExplication,
  disabled = false,
  onToggle,
}: QCMOptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const letter = optionLetters[index] || String(index + 1);

  // Determine the visual state of the option
  const optionState = useMemo(() => {
    if (!isRevealed) {
      return isSelected ? 'selected' : 'default';
    }
    
    if (isCorrect && isSelected) return 'correct-selected';
    if (isCorrect && !isSelected) return 'correct-missed';
    if (!isCorrect && isSelected) return 'incorrect-selected';
    return 'default-revealed';
  }, [isRevealed, isSelected, isCorrect]);

  // Get styles based on state
  const getOptionStyles = () => {
    switch (optionState) {
      case 'selected':
        return {
          container: 'border-[var(--primary)] bg-[var(--primary-light)]',
          checkbox: 'bg-[var(--primary)] border-[var(--primary)]',
          text: 'text-[var(--text-primary)] font-medium',
          letter: 'text-[var(--primary)]',
        };
      case 'correct-selected':
        return {
          container: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
          checkbox: 'bg-emerald-500 border-emerald-500',
          text: 'text-emerald-600 dark:text-emerald-400 font-medium',
          letter: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'correct-missed':
        return {
          container: 'border-[var(--border)] bg-transparent',
          checkbox: 'border-[var(--border)]',
          text: 'text-[var(--text-secondary)]',
          letter: 'text-[var(--text-secondary)]',
        };
      case 'incorrect-selected':
        return {
          container: 'border-red-500 bg-red-50 dark:bg-red-900/20',
          checkbox: 'bg-red-500 border-red-500',
          text: 'text-red-600 dark:text-red-400 font-medium line-through',
          letter: 'text-red-600 dark:text-red-400',
        };
      default:
        return {
          container: 'border-[var(--border)] bg-transparent hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]',
          checkbox: 'border-[var(--border)]',
          text: 'text-[var(--text-primary)]',
          letter: 'text-[var(--text-secondary)]',
        };
    }
  };

  const styles = getOptionStyles();
  const hasExplanation = modeExplication && isRevealed && explanation;

  return (
    <div className="mb-2 last:mb-0">
      <button
        onClick={() => !disabled && onToggle(option.id)}
        disabled={disabled}
        className={cn(
          'w-full flex items-start gap-3 p-3 rounded-xl border transition-all duration-200',
          styles.container,
          disabled && 'cursor-default',
          !disabled && !isRevealed && 'cursor-pointer'
        )}
      >
        {/* Letter */}
        <span className={cn('font-bold text-sm min-w-[20px]', styles.letter)}>
          {letter}.
        </span>

        {/* Checkbox */}
        <div
          className={cn(
            'w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200',
            styles.checkbox
          )}
        >
          {(isSelected || (isRevealed && isCorrect)) && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {optionState === 'incorrect-selected' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
          )}
        </div>

        {/* Option Text */}
        <div className="flex-1 text-left">
          <span className={cn('text-sm leading-relaxed', styles.text)}>
            {option.text}
          </span>
        </div>

        {/* Expand button for explanation */}
        {hasExplanation && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </button>

      {/* Explanation panel */}
      {hasExplanation && isExpanded && (
        <div className="mt-2 ml-12 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
          {explanation}
        </div>
      )}
    </div>
  );
}

export default QCMOption;
