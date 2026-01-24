interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onProfileClick?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function DashboardHeader({
  title,
  subtitle,
  onProfileClick,
  onThemeToggle,
  isDarkMode = true,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10 flex-wrap gap-4">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex-shrink-0 shadow-lg dark:shadow-purple-500/20 transition-all duration-300" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.2] text-gray-900 dark:text-white transition-colors duration-300" style={{ fontFamily: 'Product Sans, sans-serif' }}>
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/60 leading-[1.2] transition-colors duration-300" style={{ fontFamily: 'Product Sans, sans-serif' }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Profile and Dark Mode */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Dark Mode Toggle with Icons */}
        <button
          onClick={onThemeToggle}
          className="relative w-14 h-7 sm:w-16 sm:h-8 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-white/20 rounded-full flex items-center px-1 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300 group"
          aria-label="Toggle theme"
        >
          {/* Sun Icon */}
          <svg 
            className={`absolute left-1.5 w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 transition-all duration-300 ${
              isDarkMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          
          {/* Moon Icon */}
          <svg 
            className={`absolute right-1.5 w-4 h-4 sm:w-5 sm:h-5 text-blue-400 transition-all duration-300 ${
              isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          
          {/* Toggle Circle */}
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 bg-white dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out shadow-lg ${
              isDarkMode ? 'translate-x-7 sm:translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
        
        {/* Profile */}
        <button
          onClick={onProfileClick}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border-2 border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 hover:scale-105"
          aria-label="Profile"
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 transition-all duration-300" />
        </button>
      </div>
    </header>
  );
}

