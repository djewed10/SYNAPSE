"use client";

import { useLanguage } from "@/contexts/language-context";

interface CourseCardProps {
  title: string;
  progress: number;
  total: number;
  layer: number;
  onStart?: () => void;
  onReview?: () => void;
  onFilter?: () => void;
  onStats?: () => void;
}

export default function CourseCard({
  title,
  progress,
  total,
  layer,
  onStart,
  onReview,
  onFilter,
  onStats,
}: CourseCardProps) {
  const { t } = useLanguage();
  const progressPercentage = (progress / total) * 100;
  const segments = 4;
  const filledSegments = Math.floor((progress / total) * segments);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-white/20 rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 mb-6 md:mb-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-500/10">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl leading-[1.2] mb-4 font-medium text-gray-900 dark:text-white" style={{ fontFamily: 'Product Sans, sans-serif' }}>
          {title}
        </h2>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <button
            onClick={onStart}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/20 rounded-lg h-8 sm:h-10 text-xs sm:text-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Product Sans, sans-serif' }}
          >
            {t('course.start')}
          </button>
          <button
            onClick={onReview}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/20 rounded-lg h-8 sm:h-10 text-xs sm:text-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Product Sans, sans-serif' }}
          >
            {t('course.review')}
          </button>
          <button
            onClick={onFilter}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/20 rounded-lg h-8 sm:h-10 text-xs sm:text-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Product Sans, sans-serif' }}
          >
            {t('course.filter')}
          </button>
          <button
            onClick={onStats}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/20 rounded-lg h-8 sm:h-10 text-xs sm:text-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Product Sans, sans-serif' }}
          >
            {t('course.stats')}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1 h-2 sm:h-3 mb-3">
        {Array.from({ length: segments }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-all duration-500 ${
              index < filledSegments ? 'bg-purple-400 dark:bg-purple-500' : 'bg-gray-300 dark:bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Progress Text */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
        <span className="text-xs sm:text-sm text-gray-600 dark:text-white/80" style={{ fontFamily: 'Product Sans, sans-serif' }}>
          ({progress} {t('course.progress')} {total})
        </span>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium">
            {layer}
          </span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-white/80">{t('course.layer')}</span>
        </div>
      </div>
    </div>
  );
}

