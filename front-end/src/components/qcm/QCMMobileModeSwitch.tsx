'use client';

import { cn } from '@/lib/utils';
import { List, Square } from 'lucide-react';
import type { QCMDisplayMode } from '@/types/qcm';

interface QCMMobileModeSwitchProps {
  displayMode: QCMDisplayMode;
  onDisplayModeChange: (mode: QCMDisplayMode) => void;
  className?: string;
}

export function QCMMobileModeSwitch({
  displayMode,
  onDisplayModeChange,
  className,
}: QCMMobileModeSwitchProps) {
  return (
    <div
      className={cn(
        'lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-20',
        'flex items-center gap-1 p-1 rounded-full',
        'bg-[var(--surface)] border border-[var(--border)]',
        'shadow-lg',
        className
      )}
    >
      <button
        onClick={() => onDisplayModeChange('scroll')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          displayMode === 'scroll'
            ? 'bg-[var(--primary)] text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        )}
      >
        <List className="w-4 h-4" />
        <span>Liste</span>
      </button>
      <button
        onClick={() => onDisplayModeChange('single')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          displayMode === 'single'
            ? 'bg-[var(--primary)] text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        )}
      >
        <Square className="w-4 h-4" />
        <span>Un par un</span>
      </button>
    </div>
  );
}

export default QCMMobileModeSwitch;
