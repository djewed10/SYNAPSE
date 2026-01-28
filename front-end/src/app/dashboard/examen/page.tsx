'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Play } from 'lucide-react';

type ExamType = 'residanat' | 'pcem' | 'custom';

export default function ExamenPage() {
  const [examType, setExamType] = useState<ExamType>('residanat');

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
            <Clock className="w-8 h-8 text-[var(--primary)]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Examen</h1>
          </div>
          <p className="text-[var(--text-secondary)]">Testez vos connaissances en conditions réelles</p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* Exam Type Selection */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Type Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full p-1 bg-[var(--surface)] border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {(['residanat', 'pcem', 'custom'] as ExamType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setExamType(type)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                    examType === type
                      ? 'bg-[var(--primary)] text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {type === 'custom' ? 'Personnalisé' : type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExamCard 
              title="Examen Blanc 1"
              questions={100}
              duration={180}
              difficulty="Moyen"
            />
            <ExamCard 
              title="Examen Blanc 2"
              questions={100}
              duration={180}
              difficulty="Difficile"
            />
            <ExamCard 
              title="Examen Blanc 3"
              questions={120}
              duration={200}
              difficulty="Facile"
            />
            <ExamCard 
              title="QCM Rapide"
              questions={30}
              duration={45}
              difficulty="Moyen"
            />
            <ExamCard 
              title="Marathon"
              questions={200}
              duration={300}
              difficulty="Difficile"
            />
            <ExamCard 
              title="Mini Test"
              questions={20}
              duration={30}
              difficulty="Facile"
              isNew
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamCard({ 
  title, 
  questions, 
  duration, 
  difficulty,
  isNew = false
}: { 
  title: string; 
  questions: number; 
  duration: number; 
  difficulty: string;
  isNew?: boolean;
}) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'facile': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
      case 'moyen': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'difficile': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-[var(--text-secondary)] bg-[var(--surface)]';
    }
  };

  return (
    <div 
      className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer relative"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
          NEW
        </span>
      )}
      
      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-4">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Questions</span>
          <span className="font-medium text-[var(--text-primary)]">{questions}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Durée</span>
          <span className="font-medium text-[var(--text-primary)]">{duration} min</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Difficulté</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors">
        <Play className="w-4 h-4 fill-current" />
        Commencer
      </button>
    </div>
  );
}
