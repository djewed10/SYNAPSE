'use client';

import { useState } from 'react';
import Link from 'next/link';
import { modules, categories, getCategoryLabel, type Category, type Module } from '@/lib/data/modules-data';

export default function ModulesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('biologie');
  
  const filteredModules = modules.filter(m => m.category === activeCategory);
  const moduleCount = filteredModules.length;

  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Page Title */}
      <div className="text-center pt-6 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">Modules</h1>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full p-1 bg-[var(--surface)] border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Module Count */}
      <div className="text-center mb-6">
        <span className="text-[var(--text-secondary)]">({moduleCount} Modules )</span>
      </div>

      {/* Modules Grid */}
      <div className="px-4 md:px-8 lg:px-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  // Generate background based on performance
  const getPerformanceBg = () => {
    const { totalAnswered, correctRate } = module.stats;
    
    // Not started or less than 50 QCMs answered - neutral/transparent
    if (totalAnswered < 50) {
      return 'var(--daily-goal-bg)';
    }
    
    // Excellent performance (>= 80% correct)
    if (correctRate >= 80) {
      return 'var(--module-bg-excellent)';
    }
    
    // Medium performance (50-79% correct)
    if (correctRate >= 50) {
      return 'var(--module-bg-medium)';
    }
    
    // Bad performance (< 50% correct)
    return 'var(--module-bg-bad)';
  };

  // Format module name for display
  const formatModuleName = (name: string) => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get emoji based on module name for placeholder
  const getModuleEmoji = (name: string): string => {
    const emojiMap: Record<string, string> = {
      'Anatomie-pathologique': '🔬',
      'Biochimie': '🧪',
      'Embryologie': '🧬',
      'Genetique': '🧬',
      'Hemobiologie': '🩸',
      'Histologie': '🔬',
      'Immunologie': '🛡️',
      'Microbiologie': '🦠',
      'Parasitologie': '🦠',
      'Physiologie': '💓',
      'Cardiologie': '❤️',
      'Dermatologie': '🧴',
      'Endocrinologie': '⚗️',
      'Epidemiologie': '📊',
      'Gériatrie': '👴',
      'Hematologie': '🩸',
      'Hepato-gastro-enterologie': '🫁',
      'Maladies-infectieuses': '🦠',
      'Medecine-de-travail': '⚕️',
      'Medecine-legale': '⚖️',
      'Nephrologie': '🫘',
      'Neurologie': '🧠',
      'Pediatrie': '👶',
      'Pneumologie': '🫁',
      'Psychiatrie': '🧠',
      'Radiologie': '📷',
      'Reanimation': '🏥',
      'Rhumatologie': '🦴',
      'Therapeutique': '💊',
      'Chirurgie-generale': '🔪',
      'Chirurgie-infantile': '👶',
      'Gynecologie': '🩺',
      'Neurochirurgie': '🧠',
      'Ophtalmologie': '👁️',
      'Orthopedie-Traumatologie': '🦴',
      'Oto-rhino-laryngologie': '👂',
      'Urologie': '🩺',
    };
    return emojiMap[name] || '📚';
  };

  return (
    <Link href={`/dashboard/modules/${module.id}`}>
      <div 
        className="rounded-2xl p-5 relative overflow-hidden min-h-[140px] flex flex-col  justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer border border-[var(--daily-goal-border)]"
        style={{ 
          backgroundColor: getPerformanceBg(),
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)';
        }}
      >
        {/* Module Info */}
        <div className="flex flex-row items-baseline gap-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)] ">
            {formatModuleName(module.name)}
          </h3>
          <span className="text-sm text-[var(--text-secondary)]">
            ({module.lessonsCount} Cours )
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors">
            QCM
          </button>
          <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors">
            THEORIQUE
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 flex h-3 w-[60%] rounded-full overflow-hidden">
          <div 
            className="bg-[#2ce7a2]"
            style={{ width: `${module.progress.qcm}%` }}
          />
          <div 
            className="bg-[#c1f7ec]"
            style={{ width: `${100 - module.progress.qcm}%` }}
          />
        </div>

        {/* Module Emoji/Icon */}
        <div className="absolute right-3 bottom-10 text-7xl opacity-80">
          {getModuleEmoji(module.name)}
        </div>
      </div>
    </Link>
  );
}
