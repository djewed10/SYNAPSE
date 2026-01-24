"use client";

import { useLanguage } from "@/contexts/language-context";

interface FilterItem {
  id: string;
  label: string;
}

interface FilterCategory {
  id: string;
  label: string;
  items: FilterItem[];
  icon?: React.ReactNode;
}

interface FilterSectionProps {
  categories: FilterCategory[];
}

export default function FilterSection({ categories }: FilterSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 dark:bg-white rounded-sm transition-colors duration-300" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Product Sans Black, sans-serif' }}>
          {t('button.filter')}
        </h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="group">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 dark:bg-white rounded-sm flex-shrink-0 transition-colors duration-300" />
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                {t(`filter.sources.${category.id}`)}
              </h4>
              {category.icon && (
                <div className="ml-auto text-gray-400 dark:text-white/60 transition-colors duration-300">
                  {category.icon}
                </div>
              )}
            </div>
            <div className="pl-5 sm:pl-6 md:pl-8 space-y-2">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 sm:gap-3 hover:translate-x-1 transition-transform duration-200">
                  <div className="w-3 h-3 bg-purple-300 dark:bg-white rounded-sm flex-shrink-0 transition-colors duration-300" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-white/90" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

