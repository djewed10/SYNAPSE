'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Search, ChevronDown } from 'lucide-react';

interface ResumeQCM {
  id: number;
  title: string;
  moduleName: string;
  category: string;
  questionsCount: number;
  summary: string;
  tags: string[];
}

const mockResumeQCMs: ResumeQCM[] = [
  {
    id: 1,
    title: 'Métabolisme du Fer',
    moduleName: 'Biochimie',
    category: 'biologie',
    questionsCount: 25,
    summary: 'Points clés sur l\'absorption, le transport et le stockage du fer. Rôle de la transferrine et de la ferritine.',
    tags: ['Fer', 'Transferrine', 'Ferritine', 'Hepcidine']
  },
  {
    id: 2,
    title: 'Cycle de Krebs',
    moduleName: 'Biochimie',
    category: 'biologie',
    questionsCount: 30,
    summary: 'Les étapes du cycle de l\'acide citrique, les enzymes clés et la régulation.',
    tags: ['ATP', 'NADH', 'Acétyl-CoA', 'Mitochondrie']
  },
  {
    id: 3,
    title: 'Insuffisance Cardiaque',
    moduleName: 'Cardiologie',
    category: 'medecine',
    questionsCount: 40,
    summary: 'Physiopathologie, classification NYHA, signes cliniques et prise en charge thérapeutique.',
    tags: ['NYHA', 'Dyspnée', 'Oedèmes', 'IEC']
  },
  {
    id: 4,
    title: 'Appendicite Aiguë',
    moduleName: 'Chirurgie-generale',
    category: 'chirurgie',
    questionsCount: 20,
    summary: 'Diagnostic clinique et paraclinique, score d\'Alvarado, conduite à tenir.',
    tags: ['FID', 'Défense', 'McBurney', 'Appendicectomie']
  },
];

export default function ResumeQCMPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResumes = mockResumeQCMs.filter(resume => {
    const matchesSearch = resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resume.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resume.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resume.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button - Mobile */}
          <Link href="/dashboard" className="md:hidden inline-flex items-center text-[var(--text-secondary)] mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-purple-600">Résumé</span>
              <span className="text-purple-400 text-xl font-normal">qcm</span>
            </h1>
          </div>
          <p className="text-[var(--text-secondary)]">Révisez les points essentiels de chaque cours</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Rechercher un résumé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">Toutes les catégories</option>
              <option value="biologie">Biologie</option>
              <option value="medecine">Médecine</option>
              <option value="chirurgie">Chirurgie</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* Resume Cards */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>

        {filteredResumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)]">Aucun résumé trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeCard({ resume }: { resume: ResumeQCM }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'biologie': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'medecine': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'chirurgie': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div 
      className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] transition-all duration-300 hover:shadow-lg cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${getCategoryColor(resume.category)}`}>
            {resume.moduleName}
          </span>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">{resume.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold text-sm">
          {resume.questionsCount} QCM
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
        {resume.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {resume.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-0.5 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)] text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
