'use client';

import { useState, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { QCMHeader } from '@/components/qcm/QCMHeader';
import { QCMCard } from '@/components/qcm/QCMCard';
import { QCMNavigationArrows } from '@/components/qcm/QCMToolbar';
import { QCMMobileModeSwitch } from '@/components/qcm/QCMMobileModeSwitch';
import { cn } from '@/lib/utils';
import type { QCMWithState, QCMDisplayMode, QCMAction, AnswerStatus } from '@/types/qcm';

// Mock data generator - replace with actual API call
const generateMockQCMs = (count: number = 10): QCMWithState[] => {
  const sources = ['Résidanat 2025', 'Résidanat 2024', 'PCEM 2023', 'Internat 2022'];
  const questions = [
    'Le fer est absorbé sous forme de :',
    'La prise en charge d\'une hémorragie digestive par rupture de varices œsophagiennes en urgence chez le cirrhotique comporte (cochez la réponse juste):',
    'Parmi les propositions suivantes concernant le métabolisme du fer, laquelle est exacte ?',
    'Concernant l\'anémie ferriprive, quelle proposition est correcte ?',
    'Quel est le mécanisme principal d\'absorption du fer dans l\'intestin ?',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `qcm-${i + 1}`,
    lessonId: 'lesson-1',
    questionText: questions[i % questions.length],
    propositions: [
      { id: `${i}-a`, text: 'Fer libre Fe 2+.' },
      { id: `${i}-b`, text: 'De fer de l\'hème.' },
      { id: `${i}-c`, text: 'D\'apoferritine.' },
      { id: `${i}-d`, text: 'De transferrine.' },
      { id: `${i}-e`, text: 'D\'apotransferrine.' },
    ],
    correctAnswers: [`${i}-a`, `${i}-b`],
    explanation: 'forme non héminique absorbée bla bla yadra latif khouya t9dr tzid tekteb nrml',
    source: sources[i % sources.length],
    difficulty: (i % 3) + 1,
    order: i,
    isApproved: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isAnswered: false,
    isRevealed: false,
    selectedOptions: [],
  }));
};

export default function QCMsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Get initial mode from URL or default to 'scroll'
  const initialMode = (searchParams.get('mode') as QCMDisplayMode) || 'scroll';
  
  // State
  const [qcms, setQcms] = useState<QCMWithState[]>(() => generateMockQCMs(10));
  const [displayMode, setDisplayMode] = useState<QCMDisplayMode>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modeExplication, setModeExplication] = useState(true);
  const [modeLecture, setModeLecture] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    let correct = 0, incorrect = 0, partial = 0;
    qcms.forEach(qcm => {
      if (qcm.userAnswer) {
        if (qcm.userAnswer.status === 'correct') correct++;
        else if (qcm.userAnswer.status === 'incorrect') incorrect++;
        else if (qcm.userAnswer.status === 'partial') partial++;
      }
    });
    return { correct, incorrect, partial, total: qcms.length };
  }, [qcms]);

  // Handlers
  const handleAnswerChange = useCallback((qcmId: string, selectedOptions: string[]) => {
    setQcms(prev => prev.map(qcm => 
      qcm.id === qcmId ? { ...qcm, selectedOptions } : qcm
    ));
  }, []);

  const handleVerify = useCallback((qcmId: string) => {
    setQcms(prev => prev.map(qcm => {
      if (qcm.id !== qcmId) return qcm;

      const correctSet = new Set(qcm.correctAnswers);
      const selectedSet = new Set(qcm.selectedOptions);
      
      // Calculate status
      let status: AnswerStatus;
      const allCorrectSelected = qcm.correctAnswers.every(a => selectedSet.has(a));
      const noIncorrectSelected = qcm.selectedOptions.every(s => correctSet.has(s));
      
      if (allCorrectSelected && noIncorrectSelected) {
        status = 'correct';
      } else if (qcm.selectedOptions.some(s => correctSet.has(s))) {
        status = 'partial';
      } else {
        status = 'incorrect';
      }

      return {
        ...qcm,
        isRevealed: true,
        isAnswered: true,
        userAnswer: {
          id: `answer-${qcm.id}`,
          userId: 'user-1',
          qcmId: qcm.id,
          layerId: 'layer-1',
          selectedAnswers: qcm.selectedOptions,
          status,
          pointsEarned: status === 'correct' ? 1 : status === 'partial' ? 0.5 : 0,
          answeredAt: new Date().toISOString(),
        },
      };
    }));
  }, []);

  const handleAction = useCallback((action: QCMAction, qcmId: string) => {
    console.log(`Action: ${action} on QCM: ${qcmId}`);
    // Implement action handlers (like, bookmark, comment, etc.)
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex(prev => {
      if (direction === 'prev') return Math.max(0, prev - 1);
      return Math.min(qcms.length - 1, prev + 1);
    });
  }, [qcms.length]);

  const handleDisplayModeChange = useCallback((mode: QCMDisplayMode) => {
    setDisplayMode(mode);
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const currentQcm = qcms[currentIndex];

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      {/* Header */}
      <QCMHeader
        current={currentIndex + 1}
        total={qcms.length}
        correctCount={stats.correct}
        incorrectCount={stats.incorrect}
        partialCount={stats.partial}
        displayMode={displayMode}
        modeExplication={modeExplication}
        modeLecture={modeLecture}
        onDisplayModeChange={handleDisplayModeChange}
        onModeExplicationChange={setModeExplication}
        onModeLectureChange={setModeLecture}
        onNavigate={handleNavigate}
        canNavigatePrev={currentIndex > 0}
        canNavigateNext={currentIndex < qcms.length - 1}
        hasNotification={true}
      />

      {/* Main Content */}
      <main className="pb-8">
        {displayMode === 'scroll' ? (
          // Scroll Mode - Display all QCMs
          <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
            {qcms.map((qcm, index) => (
              <QCMCard
                key={qcm.id}
                qcm={qcm}
                questionNumber={index + 1}
                totalQuestions={qcms.length}
                onAnswerChange={handleAnswerChange}
                onVerify={handleVerify}
                onAction={handleAction}
                modeExplication={modeExplication}
                modeLecture={modeLecture}
              />
            ))}
          </div>
        ) : (
          // Single Mode - Display one QCM at a time
          <>
            <QCMNavigationArrows
              onPrev={() => handleNavigate('prev')}
              onNext={() => handleNavigate('next')}
              canPrev={currentIndex > 0}
              canNext={currentIndex < qcms.length - 1}
            />

            <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-6">
              {currentQcm && (
                <QCMCard
                  qcm={currentQcm}
                  questionNumber={currentIndex + 1}
                  totalQuestions={qcms.length}
                  onAnswerChange={handleAnswerChange}
                  onVerify={handleVerify}
                  onAction={handleAction}
                  modeExplication={modeExplication}
                  modeLecture={modeLecture}
                />
              )}

              {/* Page Indicator - Mobile */}
              <div className="lg:hidden flex justify-center mt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                  <button
                    onClick={() => handleNavigate('prev')}
                    disabled={currentIndex === 0}
                    title="Question précédente"
                    aria-label="Question précédente"
                    className={cn(
                      'p-1 rounded-full transition-colors',
                      currentIndex === 0
                        ? 'text-[var(--text-muted)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                    )}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-[var(--text-primary)] min-w-[60px] text-center">
                    {currentIndex + 1} / {qcms.length}
                  </span>
                  <button
                    onClick={() => handleNavigate('next')}
                    disabled={currentIndex === qcms.length - 1}
                    title="Question suivante"
                    aria-label="Question suivante"
                    className={cn(
                      'p-1 rounded-full transition-colors',
                      currentIndex === qcms.length - 1
                        ? 'text-[var(--text-muted)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                    )}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Mobile Mode Switch */}
      <QCMMobileModeSwitch
        displayMode={displayMode}
        onDisplayModeChange={handleDisplayModeChange}
      />

      {/* Floating Action Button - Mobile */}
      <button
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-2xl bg-[var(--primary)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--primary-hover)] transition-all duration-200 active:scale-95"
        onClick={() => handleDisplayModeChange(displayMode === 'scroll' ? 'single' : 'scroll')}
        title="Changer le mode d'affichage"
        aria-label="Changer le mode d'affichage"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>
    </div>
  );
}
