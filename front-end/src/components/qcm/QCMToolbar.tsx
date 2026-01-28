'use client';

import { cn } from '@/lib/utils';
import {
    CheckCheck,
    Eye,
    ListChecks,
    ChevronLeft,
    ChevronRight,
    Lock,
    ArrowRight,
    Zap,
    Bookmark,
    Download,
} from 'lucide-react';
import type { QCMDisplayMode } from '@/types/qcm';

interface QCMToolbarProps {
  displayMode: QCMDisplayMode;
  modeExplication: boolean;
  modeLecture: boolean;
  onDisplayModeChange: (mode: QCMDisplayMode) => void;
  onModeExplicationChange: (value: boolean) => void;
  onModeLectureChange: (value: boolean) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  onAction?: (action: 'lock' | 'next' | 'zap' | 'bookmark' | 'download') => void;
  canNavigatePrev?: boolean;
  canNavigateNext?: boolean;
  className?: string;
}

// Toggle Switch Component
function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          checked ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-600'
        )}
        onClick={() => onChange(!checked)}
      >
        <div
          className={cn(
            'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </div>
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
    </label>
  );
}

// Toolbar Action Button
function ToolbarButton({
  icon,
  onClick,
  isActive,
  disabled,
  className,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2.5 rounded-xl transition-all duration-200',
        'hover:bg-[var(--surface-hover)]',
        isActive && 'bg-[var(--primary-light)] text-[var(--primary)]',
        disabled && 'opacity-50 cursor-not-allowed',
        !isActive && 'text-[var(--text-secondary)]',
        className
      )}
    >
      {icon}
    </button>
  );
}

export function QCMToolbar({
  displayMode,
  // modeExplication - passed for future toolbar enhancements
  // modeLecture - passed for future toolbar enhancements
  onDisplayModeChange,
  // onModeExplicationChange - handled in QCMModePanel
  // onModeLectureChange - handled in QCMModePanel
  onNavigate,
  onAction,
  canNavigatePrev = true,
  canNavigateNext = true,
  className,
}: QCMToolbarProps) {
  return (
    <div
      className={cn(
        'hidden lg:flex items-center justify-center gap-3 px-6 py-3 rounded-full',
        'bg-[var(--surface)] border border-[var(--border)]',
        'shadow-lg',
        className
      )}
    >
      {/* Main toolbar actions */}
      <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gray-900 dark:bg-gray-800">
        <ToolbarButton
          icon={<CheckCheck className="w-5 h-5" />}
          isActive={displayMode === 'scroll'}
          onClick={() => onDisplayModeChange('scroll')}
        />
        <ToolbarButton
          icon={<Eye className="w-5 h-5" />}
          onClick={() => onAction?.('lock')}
        />
        <ToolbarButton
          icon={<ListChecks className="w-5 h-5" />}
          isActive={displayMode === 'single'}
          onClick={() => onDisplayModeChange('single')}
        />
        <ToolbarButton
          icon={<ChevronLeft className="w-5 h-5" />}
          onClick={() => onNavigate?.('prev')}
          disabled={!canNavigatePrev}
        />
        <ToolbarButton
          icon={<Lock className="w-5 h-5" />}
          onClick={() => onAction?.('lock')}
        />
        <ToolbarButton
          icon={<ChevronRight className="w-5 h-5" />}
          onClick={() => onNavigate?.('next')}
          disabled={!canNavigateNext}
        />
        <ToolbarButton
          icon={<ArrowRight className="w-5 h-5" />}
          onClick={() => onAction?.('next')}
        />
        <ToolbarButton
          icon={<Zap className="w-5 h-5" />}
          onClick={() => onAction?.('zap')}
        />
        <ToolbarButton
          icon={<Bookmark className="w-5 h-5" />}
          onClick={() => onAction?.('bookmark')}
        />
        <ToolbarButton
          icon={<Download className="w-5 h-5" />}
          onClick={() => onAction?.('download')}
        />
      </div>
    </div>
  );
}

// PC Mode Toggle Panel - for Mode Explication and Mode Lecture
export function QCMModePanel({
  modeExplication,
  modeLecture,
  onModeExplicationChange,
  onModeLectureChange,
  className,
}: {
  modeExplication: boolean;
  modeLecture: boolean;
  onModeExplicationChange: (value: boolean) => void;
  onModeLectureChange: (value: boolean) => void;
  className?: string;
}) {
  return (
    <div className={cn('hidden lg:flex items-center gap-6', className)}>
      <ToggleSwitch
        label="Mode Explication"
        checked={modeExplication}
        onChange={onModeExplicationChange}
      />
      <ToggleSwitch
        label="Mode Lecture"
        checked={modeLecture}
        onChange={onModeLectureChange}
      />
    </div>
  );
}

// Navigation arrows for single mode (PC)
export function QCMNavigationArrows({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}) {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        title="Question précédente"
        aria-label="Question précédente"
        className={cn(
          'fixed left-4 top-1/2 -translate-y-1/2 z-20',
          'hidden lg:flex items-center justify-center',
          'w-12 h-12 rounded-full',
          'bg-[var(--surface)] border border-[var(--border)]',
          'shadow-lg transition-all duration-200',
          'hover:bg-[var(--surface-hover)] hover:scale-110',
          !canPrev && 'opacity-50 cursor-not-allowed hover:scale-100'
        )}
      >
        <ChevronLeft className="w-6 h-6 text-[var(--text-primary)]" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canNext}
        title="Question suivante"
        aria-label="Question suivante"
        className={cn(
          'fixed right-4 top-1/2 -translate-y-1/2 z-20',
          'hidden lg:flex items-center justify-center',
          'w-12 h-12 rounded-full',
          'bg-[var(--surface)] border border-[var(--border)]',
          'shadow-lg transition-all duration-200',
          'hover:bg-[var(--surface-hover)] hover:scale-110',
          !canNext && 'opacity-50 cursor-not-allowed hover:scale-100'
        )}
      >
        <ChevronRight className="w-6 h-6 text-[var(--text-primary)]" />
      </button>
    </>
  );
}

export default QCMToolbar;
