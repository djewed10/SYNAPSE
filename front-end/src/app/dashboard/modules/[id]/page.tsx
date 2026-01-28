'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Filter, RefreshCw, Play, BarChart2, ThumbsUp, Minus, Plus } from 'lucide-react';
import { getModuleById } from '@/lib/data/modules-data';
import { useTheme } from '@/contexts/theme-context';

interface LessonData {
  id: number;
  title: string;
  qcmProgress: { current: number; total: number };
  commentsCount: number;
  likesCount: number;
  layer: number;
  progressBars: { correct: number; incorrect: number; partial: number; notAnswered: number };
}

export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const moduleId = parseInt(resolvedParams.id, 10);
  const module = getModuleById(moduleId);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Module non trouvé</h1>
          <Link href="/dashboard/modules" className="text-[var(--primary)] mt-4 inline-block">
            Retour aux modules
          </Link>
        </div>
      </div>
    );
  }

  // Generate mock lesson data from the module (deterministic based on index to avoid hydration mismatch)
  const lessons: LessonData[] = module.lessons.map((lessonTitle, index) => {
    // Use index-based deterministic values instead of Math.random()
    const seed = index + 1;
    return {
      id: seed,
      title: lessonTitle,
      qcmProgress: { current: (seed * 17) % 150 + 10, total: (seed * 7) % 50 + 130 },
      commentsCount: (seed * 11) % 50 + 10,
      likesCount: (seed * 13) % 50 + 15,
      layer: (seed * 3) % 10 + 1,
      progressBars: {
        correct: (seed * 19) % 60 + 20,
        incorrect: (seed * 7) % 30 + 10,
        partial: (seed * 5) % 20 + 5,
        notAnswered: (seed * 11) % 30 + 5
      }
    };
  });

  const formatModuleName = (name: string) => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button - Mobile */}
          <Link href="/dashboard/modules" className="md:hidden inline-flex items-center text-[var(--text-secondary)] mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          {/* Title and Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {formatModuleName(module.name)}
              </h1>
              <span className="text-[var(--text-secondary)]">({module.lessonsCount} Cours)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all duration-300">
                <Filter className="w-4 h-4" />
                Filtrer
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all duration-300">
                <RefreshCw className="w-4 h-4" />
                Réviser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* Lessons Grid */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} lessonIndex={lesson.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonCard({ lesson, lessonIndex }: { lesson: LessonData; lessonIndex: number }) {
  const [layer, setLayer] = useState(lesson.layer);
  const { theme } = useTheme();

  const handleLayerChange = (delta: number) => {
    setLayer(prev => Math.max(0, prev + delta));
  };

  // Calculate progress bar widths
  const total = lesson.progressBars.correct + lesson.progressBars.incorrect + lesson.progressBars.partial + lesson.progressBars.notAnswered;
  const answered = total - lesson.progressBars.notAnswered;
  const notAnsweredWidth = (lesson.progressBars.notAnswered / total) * 100;
  const correctWidth = (lesson.progressBars.correct / answered) * 100;
  const incorrectWidth = (lesson.progressBars.incorrect / answered) * 100;
  const partialWidth = (lesson.progressBars.partial / answered) * 100;
  return (
    <div 
      className="rounded-2xl pt-3 px-6 pb-5 border border-[var(--daily-goal-border)] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-xl"
      style={{ background: 'var(--daily-goal-bg)' }}
    >
      {/* Lesson Header */}
      <div className="flex justify-between items-start mb-3 ">
        <div className="flex-1">
          <h3 className="font-bold text-[var(--text-primary)] text-base font-[product-sans] leading-tight">
            {lessonIndex}- {lesson.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-[var(--text-secondary)]">
            <span className="font-medium">({lesson.qcmProgress.current}/{lesson.qcmProgress.total})</span>
            <span className="flex items-center gap-1">
              <Image src={theme === 'dark' ? '/icons/new-white-notes.png' : '/icons/notes.png'} alt="Comments" width={16} height={16} className={theme === 'dark' ? "w-6  h-6" : "w-4 h-4"} />
              {lesson.commentsCount}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {lesson.likesCount}
            </span>
          </div>
        </div>

        {/* Layer Control */}
        <div className="flex flex-col items-center ml-4">
          <span className="text-xs text-[var(--text-secondary)] mb-1">couche</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleLayerChange(-1)}
              className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-lg text-[var(--text-primary)] min-w-[24px] text-center">
              {layer}
            </span>
            <button 
              onClick={() => handleLayerChange(1)}
              className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-4">

        <div 
          className="bg-emerald-500" 
          style={{ width: `${correctWidth}%` }}
        />
        <div 
          className="bg-red-500" 
          style={{ width: `${incorrectWidth}%` }}
        />
        <div 
          className="bg-amber-400" 
          style={{ width: `${partialWidth}%` }}
        />
        <div 
          className="bg-gray-100" 
          style={{ width: `${notAnsweredWidth}%` }}
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <button className="flex items-center justify-center gap-1 px-auto  px-0.5 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity">
          <Play className="w-3 h-3 fill" />
          <span>Démarer</span>
        </button>
        <button className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:bg-[var(--primary-hover)] transition-colors">
          <Filter className="w-3 h-3" />
          <span>Filtrer</span>
        </button>
        <button className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:bg-[var(--primary-hover)] transition-colors">
          <RefreshCw className="w-3 h-3" />
          <span>Réviser</span>
        </button>
        <button className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:[] transition-colors">
          <BarChart2 className="w-3 h-3" />
          <span>Stats</span>
        </button>
      </div>
    </div>
  );
}
