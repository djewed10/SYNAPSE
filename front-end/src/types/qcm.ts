/**
 * QCM Type Definitions
 * Based on backend schema for QCMs, user answers, and layers
 */

// Proposition/Option in a QCM
export interface QCMProposition {
  id: string;
  text: string;
}

// QCM Question structure from backend
export interface QCM {
  id: string;
  lessonId: string;
  questionText: string;
  propositions: QCMProposition[];
  correctAnswers: string[]; // Array of proposition IDs
  explanation?: string;
  source?: string; // e.g., "Résidanat 2025", "PCEM 2024"
  difficulty: number; // 1-3 scale
  order: number;
  isApproved: boolean;
  submittedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// User's answer status
export type AnswerStatus = 'correct' | 'partial' | 'incorrect';

// User answer record
export interface UserAnswer {
  id: string;
  userId: string;
  qcmId: string;
  layerId: string;
  selectedAnswers: string[]; // Array of proposition IDs
  status: AnswerStatus;
  pointsEarned: number;
  answeredAt: string;
}

// QCM with user's answer state for display
export interface QCMWithState extends QCM {
  userAnswer?: UserAnswer;
  isAnswered: boolean;
  isRevealed: boolean;
  selectedOptions: string[];
}

// Display mode for QCM pages
export type QCMDisplayMode = 'scroll' | 'single';

// QCM View mode
export type QCMViewMode = 'practice' | 'exam' | 'review';

// Option state for rendering
export interface OptionState {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  explanation?: string;
}

// QCM Session state
export interface QCMSession {
  lessonId: string;
  lessonName: string;
  layerNumber: number;
  currentIndex: number;
  totalQcms: number;
  answeredCount: number;
  correctCount: number;
  partialCount: number;
  incorrectCount: number;
  qcms: QCMWithState[];
  displayMode: QCMDisplayMode;
  modeExplication: boolean;
  modeLecture: boolean;
}

// Filter options for QCMs
export interface QCMFilterOptions {
  source?: string[];
  difficulty?: number[];
  status?: ('answered' | 'unanswered' | 'correct' | 'partial' | 'incorrect')[];
  layer?: number;
}

// Props for QCM components
export interface QCMCardProps {
  qcm: QCMWithState;
  questionNumber: number;
  totalQuestions: number;
  onAnswerChange: (qcmId: string, selectedOptions: string[]) => void;
  onVerify: (qcmId: string) => void;
  onAction: (action: QCMAction, qcmId: string) => void;
  modeExplication: boolean;
  modeLecture: boolean;
  isCompact?: boolean;
}

// Action types for QCM action bar
export type QCMAction = 
  | 'like'
  | 'comment'
  | 'hint'
  | 'notes'
  | 'bookmark'
  | 'visibility'
  | 'report'
  | 'ctf';

// Progress bar segment
export interface ProgressSegment {
  correct: number;
  incorrect: number;
  partial: number;
  unanswered: number;
}
