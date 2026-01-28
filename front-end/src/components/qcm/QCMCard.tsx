'use client';

import { cn } from '@/lib/utils';
import { QCMOption } from './QCMOption';
import { QCMActionBar, CTFBadge, ReportButton } from './QCMActionBar';
import { QCMAnswerKey } from './QCMAnswerKey';
import type { QCMWithState, QCMAction } from '@/types/qcm';

interface QCMCardProps {
  qcm: QCMWithState;
  questionNumber: number;
  totalQuestions?: number;
  onAnswerChange: (qcmId: string, selectedOptions: string[]) => void;
  onVerify: (qcmId: string) => void;
  onAction: (action: QCMAction, qcmId: string) => void;
  modeExplication: boolean;
  modeLecture: boolean;
  isCompact?: boolean;
  showActionBar?: boolean;
  className?: string;
}

export function QCMCard({
  qcm,
  questionNumber,
  // totalQuestions - available for future use
  onAnswerChange,
  onVerify,
  onAction,
  modeExplication,
  modeLecture,
  isCompact = false,
  showActionBar = true,
  className,
}: QCMCardProps) {
  const handleOptionToggle = (optionId: string) => {
    if (qcm.isRevealed || modeLecture) return;

    const newSelected = qcm.selectedOptions.includes(optionId)
      ? qcm.selectedOptions.filter((id) => id !== optionId)
      : [...qcm.selectedOptions, optionId];

    onAnswerChange(qcm.id, newSelected);
  };

  const handleVerify = () => {
    if (qcm.selectedOptions.length === 0) return;
    onVerify(qcm.id);
  };

  const hasSelectedOptions = qcm.selectedOptions.length > 0;

  return (
    <div
      className={cn(
        'bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] transition-all duration-300',
        isCompact ? 'p-4' : 'p-6',
        className
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Source Badge & Actions Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Source Badge */}
        {qcm.source && (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {qcm.source}
          </span>
        )}
        
        {/* CTF & Report (visible after reveal) */}
        {qcm.isRevealed && (
          <div className="flex items-center gap-2 ml-auto">
            <CTFBadge onClick={() => onAction('ctf', qcm.id)} />
            <ReportButton onClick={() => onAction('report', qcm.id)} />
          </div>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
          <span className="font-bold">{questionNumber}.</span>{' '}
          {qcm.questionText}
        </h3>
      </div>

      {/* Options */}
      <div className="mb-6">
        {qcm.propositions.map((proposition, index) => (
          <QCMOption
            key={proposition.id}
            option={proposition}
            index={index}
            isSelected={qcm.selectedOptions.includes(proposition.id)}
            isCorrect={qcm.correctAnswers.includes(proposition.id)}
            isRevealed={qcm.isRevealed}
            explanation={modeExplication ? qcm.explanation : undefined}
            modeExplication={modeExplication}
            disabled={qcm.isRevealed || modeLecture}
            onToggle={handleOptionToggle}
          />
        ))}
      </div>

      {/* Answer Key (shown after verification) */}
      {qcm.isRevealed && (
        <QCMAnswerKey
          propositions={qcm.propositions}
          correctAnswers={qcm.correctAnswers}
          selectedAnswers={qcm.selectedOptions}
          isRevealed={qcm.isRevealed}
        />
      )}

      {/* Verify Button */}
      {!qcm.isRevealed && !modeLecture && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleVerify}
            disabled={!hasSelectedOptions}
            className={cn(
              'px-8 py-2.5 rounded-full font-medium text-sm transition-all duration-300',
              hasSelectedOptions
                ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg'
                : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] cursor-not-allowed'
            )}
          >
            Vérifier
          </button>
        </div>
      )}

      {/* Divider & Action Bar */}
      {showActionBar && (
        <>
          <div className="border-t border-[var(--border)] mt-4" />
          <QCMActionBar
            qcmId={qcm.id}
            onAction={onAction}
            variant={isCompact ? 'compact' : 'default'}
          />
        </>
      )}
    </div>
  );
}

export default QCMCard;
