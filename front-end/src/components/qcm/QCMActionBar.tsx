'use client';

import {
    ThumbsUp,
    MessageCircle,
    Lightbulb,
    ClipboardList,
    Bookmark,
    Eye,
    Flag,
    Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QCMAction } from '@/types/qcm';

interface QCMActionBarProps {
  qcmId: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  commentsCount?: number;
  onAction: (action: QCMAction, qcmId: string) => void;
  variant?: 'default' | 'compact';
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
  count?: number;
  onClick: () => void;
  variant?: 'default' | 'compact';
}

function ActionButton({ icon, label, isActive, count, onClick, variant = 'default' }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-1.5 transition-all duration-200',
        'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
        isActive && 'text-[var(--primary)]',
        variant === 'compact' ? 'p-2' : 'p-2.5'
      )}
      title={label}
    >
      <span className={cn(
        'transition-transform duration-200 hover:scale-110',
        variant === 'compact' ? 'w-5 h-5' : 'w-5 h-5'
      )}>
        {icon}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-xs font-medium">{count}</span>
      )}
    </button>
  );
}

export function QCMActionBar({
  qcmId,
  isLiked = false,
  isBookmarked = false,
  commentsCount = 0,
  onAction,
  variant = 'default',
}: QCMActionBarProps) {
  const actions = [
    {
      id: 'like' as QCMAction,
      icon: <ThumbsUp className="w-full h-full" />,
      label: 'J\'aime',
      isActive: isLiked,
    },
    {
      id: 'comment' as QCMAction,
      icon: <MessageCircle className="w-full h-full" />,
      label: 'Commentaires',
      count: commentsCount,
    },
    {
      id: 'hint' as QCMAction,
      icon: <Lightbulb className="w-full h-full" />,
      label: 'Indice',
    },
    {
      id: 'notes' as QCMAction,
      icon: <ClipboardList className="w-full h-full" />,
      label: 'Notes',
    },
    {
      id: 'bookmark' as QCMAction,
      icon: <Bookmark className={cn('w-full h-full', isBookmarked && 'fill-current')} />,
      label: 'Sauvegarder',
      isActive: isBookmarked,
    },
    {
      id: 'visibility' as QCMAction,
      icon: <Eye className="w-full h-full" />,
      label: 'Visibilité',
    },
  ];

  return (
    <div className={cn(
      'flex items-center justify-center gap-1',
      variant === 'default' && 'pt-4 border-t border-[var(--border)]'
    )}>
      {actions.map((action) => (
        <ActionButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          isActive={action.isActive}
          count={action.count}
          onClick={() => onAction(action.id, qcmId)}
          variant={variant}
        />
      ))}
    </div>
  );
}

// CTF Badge Component
export function CTFBadge({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
    >
      CTF
    </button>
  );
}

// Report Flag Button
export function ReportButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-red-400 hover:text-red-500 transition-colors"
      title="Signaler"
    >
      <Flag className="w-4 h-4" />
    </button>
  );
}

// Copy Question Button
export function CopyButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      title="Copier"
    >
      <Copy className="w-4 h-4" />
    </button>
  );
}

export default QCMActionBar;
