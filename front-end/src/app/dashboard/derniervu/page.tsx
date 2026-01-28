'use client';

import Link from 'next/link';
import { ArrowLeft, Eye, Play, RotateCw } from 'lucide-react';

interface HistoryItem {
  id: number;
  title: string;
  moduleName: string;
  progress: { current: number; total: number };
  lastViewed: string;
}

const mockHistoryItems: HistoryItem[] = [
  { id: 1, title: 'La néoglucogenèse', moduleName: 'Biochimie', progress: { current: 45, total: 120 }, lastViewed: 'Il y a 2 heures' },
  { id: 2, title: 'Tissu musculaire strié', moduleName: 'Histologie', progress: { current: 80, total: 110 }, lastViewed: 'Il y a 5 heures' },
  { id: 3, title: 'Equilibre acido-basique', moduleName: 'Physiologie', progress: { current: 25, total: 95 }, lastViewed: 'Hier' },
  { id: 4, title: 'Gamétogenèse', moduleName: 'Embryologie', progress: { current: 60, total: 85 }, lastViewed: 'Hier' },
  { id: 5, title: 'Inflammation aigue', moduleName: 'Anatomie-pathologique', progress: { current: 30, total: 70 }, lastViewed: 'Il y a 2 jours' },
  { id: 6, title: 'Hypertension artérielle', moduleName: 'Cardiologie', progress: { current: 100, total: 150 }, lastViewed: 'Il y a 3 jours' },
];

export default function DernierVuPage() {
  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button - Mobile */}
          <Link href="/dashboard" className="md:hidden inline-flex items-center text-[var(--text-secondary)] mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-emerald-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Dernier vu</h1>
          </div>
          <p className="text-[var(--text-secondary)]">Continuez là où vous vous êtes arrêté</p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* History List */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {mockHistoryItems.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryCard({ item }: { item: HistoryItem }) {
  const progressPercent = (item.progress.current / item.progress.total) * 100;

  return (
    <div 
      className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] transition-all duration-300 hover:shadow-lg"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-medium">
              {item.moduleName}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{item.lastViewed}</span>
          </div>
          <h3 className="font-bold text-[var(--text-primary)] text-lg">{item.title}</h3>
          
          {/* Progress */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">Progression</span>
              <span className="font-medium text-[var(--text-primary)]">{item.progress.current}/{item.progress.total}</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors">
            <Play className="w-4 h-4 fill-current" />
            Continuer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-hover)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors border border-[var(--border)]">
            <RotateCw className="w-4 h-4" />
            Refaire
          </button>
        </div>
      </div>
    </div>
  );
}
