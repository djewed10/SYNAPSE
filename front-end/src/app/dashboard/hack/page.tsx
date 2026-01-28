'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Target, TrendingUp, Clock, Play } from 'lucide-react';

interface HackMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const hackModes: HackMode[] = [
  {
    id: 'speed',
    title: 'Speed Run',
    description: 'Répondez au maximum de questions en temps limité',
    icon: <Zap className="w-8 h-8" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30'
  },
  {
    id: 'precision',
    title: 'Précision',
    description: 'Pas de temps limite, mais pas le droit à l\'erreur',
    icon: <Target className="w-8 h-8" />,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    id: 'endurance',
    title: 'Endurance',
    description: 'Enchaînez les questions jusqu\'à l\'épuisement',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
  },
  {
    id: 'chrono',
    title: 'Chrono Challenge',
    description: '10 secondes par question, pas de pitié',
    icon: <Clock className="w-8 h-8" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
];

export default function HackPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

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
            <img src="/icons/hack_icon.png" alt="Hack" className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold text-amber-500">Hack Mode</h1>
          </div>
          <p className="text-[var(--text-secondary)]">Défiez-vous avec des modes de jeu spéciaux</p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* Mode Selection */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Choisissez votre mode</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackModes.map((mode) => (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedMode === mode.id
                    ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                    : 'border-[var(--border)] bg-[var(--surface)]'
                }`}
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${mode.bgColor} ${mode.color}`}>
                    {mode.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">{mode.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{mode.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Start Button */}
          {selectedMode && (
            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-3 px-8 py-3 rounded-full bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl">
                <Play className="w-6 h-6 fill-current" />
                Lancer le mode {hackModes.find(m => m.id === selectedMode)?.title}
              </button>
            </div>
          )}

          {/* Leaderboard Preview */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">🏆 Meilleurs scores</h2>
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
              {[
                { rank: 1, name: 'DrMedStudent', score: 9850, mode: 'Speed Run' },
                { rank: 2, name: 'FutureDoc', score: 9200, mode: 'Précision' },
                { rank: 3, name: 'MedWarrior', score: 8750, mode: 'Endurance' },
              ].map((entry, index) => (
                <div 
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 ${index !== 2 ? 'border-b border-[var(--border)]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                      entry.rank === 1 ? 'bg-amber-400 text-amber-900' :
                      entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      'bg-amber-700 text-amber-100'
                    }`}>
                      {entry.rank}
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--text-secondary)]">{entry.mode}</span>
                    <span className="font-bold text-[var(--primary)]">{entry.score.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
