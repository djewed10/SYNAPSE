'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { QCMProgressBar } from './QCMProgressBar';
import { QCMToolbar, QCMModePanel } from './QCMToolbar';
import type { QCMDisplayMode } from '@/types/qcm';

interface QCMHeaderProps {
  current: number;
  total: number;
  correctCount?: number;
  incorrectCount?: number;
  partialCount?: number;
  displayMode: QCMDisplayMode;
  modeExplication: boolean;
  modeLecture: boolean;
  onDisplayModeChange: (mode: QCMDisplayMode) => void;
  onModeExplicationChange: (value: boolean) => void;
  onModeLectureChange: (value: boolean) => void;
  onMenuClick?: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  canNavigatePrev?: boolean;
  canNavigateNext?: boolean;
  showToolbar?: boolean;
  userAvatar?: string;
  hasNotification?: boolean;
}

export function QCMHeader({
  current,
  total,
  correctCount = 0,
  incorrectCount = 0,
  partialCount = 0,
  displayMode,
  modeExplication,
  modeLecture,
  onDisplayModeChange,
  onModeExplicationChange,
  onModeLectureChange,
  onMenuClick,
  onNavigate,
  canNavigatePrev = true,
  canNavigateNext = true,
  showToolbar = true,
  userAvatar,
  hasNotification = false,
}: QCMHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-[var(--background)] border-b border-[var(--border)]">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 text-[var(--text-primary)]"
              title="Menu"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/icons/synapse-logo.png"
                alt="Synapse"
                width={32}
                height={32}
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
          </div>

          {/* Theme Toggle & Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--surface)] border border-[var(--border)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
              )}
            </button>

            {/* Avatar with notification dot */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--border)]">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt="User"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--primary-light)] flex items-center justify-center">
                    <span className="text-[var(--primary)] font-bold text-sm">U</span>
                  </div>
                )}
              </div>
              {hasNotification && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--background)]" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <QCMProgressBar
            current={current}
            total={total}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            partialCount={partialCount}
          />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/icons/synapse-logo.png"
              alt="Synapse"
              width={140}
              height={40}
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Center Toolbar */}
          {showToolbar && (
            <QCMToolbar
              displayMode={displayMode}
              modeExplication={modeExplication}
              modeLecture={modeLecture}
              onDisplayModeChange={onDisplayModeChange}
              onModeExplicationChange={onModeExplicationChange}
              onModeLectureChange={onModeLectureChange}
              onNavigate={onNavigate}
              canNavigatePrev={canNavigatePrev}
              canNavigateNext={canNavigateNext}
            />
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
              )}
            </button>

            {/* Avatar with notification dot */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt="User"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--primary-light)] flex items-center justify-center">
                    <span className="text-[var(--primary)] font-bold">U</span>
                  </div>
                )}
              </div>
              {hasNotification && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[var(--background)]" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar & Mode Toggles */}
        <div className="flex items-center gap-8 px-8 pb-4">
          <div className="flex-1 max-w-xl">
            <QCMProgressBar
              current={current}
              total={total}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              partialCount={partialCount}
            />
          </div>

          <QCMModePanel
            modeExplication={modeExplication}
            modeLecture={modeLecture}
            onModeExplicationChange={onModeExplicationChange}
            onModeLectureChange={onModeLectureChange}
          />
        </div>
      </div>
    </header>
  );
}

export default QCMHeader;
