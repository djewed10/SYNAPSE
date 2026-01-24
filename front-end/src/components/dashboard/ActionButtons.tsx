"use client";

import { useLanguage } from "@/contexts/language-context";

interface ActionButtonsProps {
  onFilter?: () => void;
  onReview?: () => void;
}

export default function ActionButtons({ onFilter, onReview }: ActionButtonsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
      <button
        onClick={onFilter}
        className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-white/20 rounded-xl h-10 sm:h-12 md:h-14 flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl hover:bg-gray-200 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
        style={{ fontFamily: 'Product Sans, sans-serif' }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="sm:w-5 sm:h-5">
          <path d="M2 2L16 16M2 2v14M2 2h14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>{t('button.filter')}</span>
      </button>
      <button
        onClick={onReview}
        className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-white/20 rounded-xl h-10 sm:h-12 md:h-14 flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl hover:bg-gray-200 dark:hover:bg-white/5 transition-all duration-300 text-gray-900 dark:text-white"
        style={{ fontFamily: 'Product Sans, sans-serif' }}
      >
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="sm:w-5 sm:h-4">
          <path d="M1 1l5.5 5.5L12 1" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span>{t('button.review')}</span>
      </button>
    </div>
  );
}

