'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, Target, Clock, Award, BarChart2 } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: { value: number; isPositive: boolean };
}

const statCards: StatCard[] = [
  {
    title: 'Total QCM',
    value: '1,247',
    subtitle: 'Questions répondues',
    icon: <BarChart2 className="w-6 h-6" />,
    color: 'text-[var(--primary)]',
    trend: { value: 12, isPositive: true }
  },
  {
    title: 'Taux de réussite',
    value: '76%',
    subtitle: 'Moyenne globale',
    icon: <Target className="w-6 h-6" />,
    color: 'text-emerald-500',
    trend: { value: 5, isPositive: true }
  },
  {
    title: 'Temps moyen',
    value: '42s',
    subtitle: 'Par question',
    icon: <Clock className="w-6 h-6" />,
    color: 'text-amber-500',
    trend: { value: 3, isPositive: false }
  },
  {
    title: 'Série actuelle',
    value: '7',
    subtitle: 'Jours consécutifs',
    icon: <Award className="w-6 h-6" />,
    color: 'text-purple-500'
  },
];

const moduleStats = [
  { name: 'Biochimie', progress: 75, total: 500 },
  { name: 'Histologie', progress: 45, total: 300 },
  { name: 'Physiologie', progress: 60, total: 400 },
  { name: 'Cardiologie', progress: 30, total: 350 },
  { name: 'Chirurgie', progress: 55, total: 280 },
];

export default function StatisticsPage() {
  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button - Mobile */}
          <Link href="/dashboard" className="md:hidden inline-flex items-center text-[var(--text-secondary)] mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-sky-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Statistiques</h1>
          </div>
          <p className="text-[var(--text-secondary)]">Suivez votre progression et vos performances</p>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* Stats Grid */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <StatCardComponent key={index} stat={stat} />
            ))}
          </div>

          {/* Module Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress by Module */}
            <div 
              className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="font-bold text-lg text-[var(--text-primary)] mb-6">Progression par module</h2>
              <div className="space-y-4">
                {moduleStats.map((module, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{module.name}</span>
                      <span className="text-sm text-[var(--text-secondary)]">{module.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-blue)]"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity */}
            <div 
              className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="font-bold text-lg text-[var(--text-primary)] mb-6">Activité hebdomadaire</h2>
              <div className="flex items-end justify-between h-40 gap-2">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => {
                  const height = Math.random() * 100 + 20;
                  const isToday = index === 6;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-300 ${isToday ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}
                        style={{ height: `${height}%` }}
                      />
                      <span className={`text-xs ${isToday ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)]'}`}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div 
            className="mt-6 bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-bold text-lg text-[var(--text-primary)] mb-4">Performance récente</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-[var(--text-secondary)] border-b border-[var(--border)]">
                    <th className="pb-3">Module</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Score</th>
                    <th className="pb-3">Temps</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { module: 'Biochimie', date: '26 jan 2026', score: '85%', time: '12:34' },
                    { module: 'Histologie', date: '25 jan 2026', score: '72%', time: '18:45' },
                    { module: 'Cardiologie', date: '24 jan 2026', score: '90%', time: '10:12' },
                    { module: 'Physiologie', date: '23 jan 2026', score: '68%', time: '22:30' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-3 font-medium text-[var(--text-primary)]">{row.module}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{row.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          parseInt(row.score) >= 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          parseInt(row.score) >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {row.score}
                        </span>
                      </td>
                      <td className="py-3 text-[var(--text-secondary)]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCardComponent({ stat }: { stat: StatCard }) {
  return (
    <div 
      className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] transition-all duration-300 hover:shadow-md"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`${stat.color}`}>{stat.icon}</span>
        {stat.trend && (
          <span className={`text-xs font-medium ${stat.trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {stat.trend.isPositive ? '↑' : '↓'} {stat.trend.value}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
      <div className="text-xs text-[var(--text-secondary)]">{stat.subtitle}</div>
    </div>
  );
}