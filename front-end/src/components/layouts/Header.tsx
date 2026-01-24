'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/theme-context';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Modules', href: '/modules' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'QCM', href: '/qcms' },
  { label: 'Playlists', href: '/playlists' },
  { label: 'Statistiques', href: '/statistics' },
];

// Constants for drawer behavior
const DRAWER_WIDTH = 280;
const VELOCITY_THRESHOLD = 0.3; // px/ms - lower = more sensitive
const DISTANCE_THRESHOLD = 0.4; // 40% of drawer width

export function Header() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Refs for touch tracking (no re-renders)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const lastTouchX = useRef(0);
  const lastTouchTime = useRef(0);
  const velocity = useRef(0);
  const gestureDirection = useRef<'horizontal' | 'vertical' | null>(null);
  const isOpenRef = useRef(false); // Sync with state for event handlers
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync with state
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href);

  // Apply transform directly to DOM (no React re-render during drag)
  const applyTransform = useCallback((x: number, animate: boolean) => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    const clampedX = Math.max(0, Math.min(DRAWER_WIDTH, x));
    const progress = clampedX / DRAWER_WIDTH;
    const transition = animate ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';

    // Drawer slides from -DRAWER_WIDTH to 0
    drawer.style.transition = transition;
    drawer.style.transform = `translate3d(${clampedX - DRAWER_WIDTH}px, 0, 0)`;

    // Overlay fades in
    overlay.style.transition = animate ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    overlay.style.opacity = String(progress * 0.5);
    overlay.style.pointerEvents = progress > 0.1 ? 'auto' : 'none';
  }, []);

  // Open drawer
  const openDrawer = useCallback(() => {
    setIsOpen(true);
    setDragX(DRAWER_WIDTH);
    applyTransform(DRAWER_WIDTH, true);
    document.body.style.overflow = 'hidden';
  }, [applyTransform]);

  // Close drawer
  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setDragX(0);
    applyTransform(0, true);
    document.body.style.overflow = '';
  }, [applyTransform]);

  // Touch event handlers
  useEffect(() => {
    // Only on mobile
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      lastTouchX.current = touch.clientX;
      lastTouchTime.current = performance.now();
      velocity.current = 0;
      gestureDirection.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Lock direction after 10px movement
      if (!gestureDirection.current && (absX > 10 || absY > 10)) {
        if (absX > absY * 1.2) {
          // Horizontal swipe detected
          const isSwipingRight = deltaX > 0;
          const canOpen = !isOpenRef.current && isSwipingRight;
          const canClose = isOpenRef.current && !isSwipingRight;

          if (canOpen || canClose) {
            gestureDirection.current = 'horizontal';
            setIsDragging(true);
          } else {
            gestureDirection.current = 'vertical';
          }
        } else {
          gestureDirection.current = 'vertical';
        }
      }

      // Only handle horizontal gestures
      if (gestureDirection.current !== 'horizontal') return;

      // Prevent scroll & pull-to-refresh
      e.preventDefault();

      // Calculate current position
      const baseX = isOpenRef.current ? DRAWER_WIDTH : 0;
      const newX = Math.max(0, Math.min(DRAWER_WIDTH, baseX + deltaX));
      
      touchCurrentX.current = touch.clientX;
      setDragX(newX);
      applyTransform(newX, false);

      // Calculate velocity (px/ms)
      const now = performance.now();
      const dt = now - lastTouchTime.current;
      if (dt > 0) {
        velocity.current = (touch.clientX - lastTouchX.current) / dt;
      }
      lastTouchX.current = touch.clientX;
      lastTouchTime.current = now;
    };

    const handleTouchEnd = () => {
      if (gestureDirection.current !== 'horizontal') {
        gestureDirection.current = null;
        return;
      }

      setIsDragging(false);
      gestureDirection.current = null;

      // Decide open or close based on velocity and position
      const currentX = dragX;
      const progress = currentX / DRAWER_WIDTH;
      const vel = velocity.current;

      // Fast swipe takes priority
      if (vel > VELOCITY_THRESHOLD) {
        openDrawer();
      } else if (vel < -VELOCITY_THRESHOLD) {
        closeDrawer();
      } else {
        // Otherwise, use distance threshold
        if (progress > DISTANCE_THRESHOLD) {
          openDrawer();
        } else {
          closeDrawer();
        }
      }
    };

    // Attach listeners with passive: false for preventDefault
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      document.body.style.overflow = '';
    };
  }, [dragX, applyTransform, openDrawer, closeDrawer]);

  // Sync drawer position when isOpen changes programmatically
  useEffect(() => {
    if (!isDragging) {
      applyTransform(isOpen ? DRAWER_WIDTH : 0, true);
      setDragX(isOpen ? DRAWER_WIDTH : 0);
    }
  }, [isOpen, isDragging, applyTransform]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, closeDrawer]);

  const quickActions = [
    {
      key: 'modules',
      type: 'link',
      href: '/modules',
      label: 'Modules',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7l5-3 5 3-5 3-5-3Zm0 5l5 3 5-3M7 12v5l5 3 5-3v-5" />
        </svg>
      ),
    },
    {
      key: 'qcm',
      type: 'link',
      href: '/qcms',
      label: 'QCM',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      key: 'lessons',
      type: 'link',
      href: '/lessons',
      label: 'Lessons',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h9a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 3V5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 5h4v16a2 2 0 0 1-2 2H7" />
        </svg>
      ),
    },
    {
      key: 'back',
      type: 'action',
      label: 'Back',
      onClick: () => window.history.back(),
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5 8 12l7 7" />
        </svg>
      ),
    },
    {
      key: 'home',
      type: 'link',
      href: '/',
      label: 'Accueil',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
        </svg>
      ),
    },
    {
      key: 'forward',
      type: 'action',
      label: 'Forward',
      onClick: () => window.history.forward(),
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
        </svg>
      ),
    },
    {
      key: 'playlists',
      type: 'link',
      href: '/playlists',
      label: 'Playlists',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h7" />
        </svg>
      ),
    },
    {
      key: 'bookmarks',
      type: 'link',
      href: '/qcms',
      label: 'Favoris',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
        </svg>
      ),
    },
    {
      key: 'stats',
      type: 'link',
      href: '/statistics',
      label: 'Statistiques',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9h9" />
        </svg>
      ),
    },
  ] as const;

  return (
    <header className=" top-0 z-30 border-b   bg-[var(--background)] transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#3b4df8] via-[#6c79ff] to-transparent opacity-50" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-4">
        {/* Brand + menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openDrawer}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#3b4df8] shadow-sm transition hover:shadow-md active:scale-95"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </button>

            <Link href="/" className="flex items-center gap-2 text-[#2b35b3] dark:text-blue-400">
            <Image 
              src="/icons/Synapse S only.png" 
              alt="Synapse" 
              width={80} 
              height={80} 
              className="h-11 w-11 sm:hidden" 
            />
            <Image 
              src="/icons/Synapse Full logo.png" 
              alt="Synapse" 
              width={100} 
              height={100} 
              className="hidden sm:inline h-28 mt-2 w-auto" 
            />
            </Link>
        </div>

        {/* Desktop pill navigation */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full bg-[#3b4df8] px-4 py-2 shadow-lg shadow-blue-300/40">
          {quickActions.map((item) => {
            if (item.type === 'link') {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition ${
                    active ? 'bg-white/20' : 'hover:bg-white/15'
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
                aria-label={item.label}
              >
                {item.icon}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex mr-[-40px] items-center ">
          <button
            onClick={toggleTheme}
            className="relative mr-[-10px] inline-flex h-6 w-14 items-center rounded-full bg-[#3b4df8] px-1 shadow-sm shadow-blue-200/70 dark:shadow-blue-900/50 transition-all duration-300 hover:shadow-md active:scale-95"
            aria-label="Toggle theme"
            type="button"
          >
            {/* Sun Icon */}
            <span className={`absolute left-1.5 text-white transition-all duration-300 ${
              theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </span>
            {/* Moon Icon */}
            <span className={`absolute right-1.5 text-white transition-all duration-300 ${
              theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </span>
            {/* Toggle Circle */}
            <span className={`h-5 w-5 rounded-full bg-white shadow-md transition-all duration-1000 ease-in-out ${
              theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
            }`} />
          </button>

          {isAuthenticated && user ? (
            <button
              onClick={logout}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3b4df8]/20 dark:border-blue-500/30 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300"
              aria-label="Profile"
            >
              <span className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900" />
            </button>
          ) : (
            <Link
              href="/login"
              aria-label="Login"
            >
            <Image 
              src="/images/Profile.png" 
              alt="Synapse" 
              width={80} 
              height={80} 
              className="  w-[110px]
              " 
            />
           
           
            </Link>
          )}
        </div>
      </div>

      {isMounted
        ? createPortal(
            <div
              ref={containerRef}
              className={`lg:hidden fixed inset-0 z-50 ${isOpen || isDragging || dragX > 0 ? 'visible' : 'invisible pointer-events-none'}`}
              style={{ touchAction: 'pan-y' }}
            >
              {/* Overlay - dims the background */}
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-black"
                style={{
                  opacity: 0,
                  pointerEvents: 'none',
                }}
                onClick={closeDrawer}
              />

              {/* Drawer Panel */}
              <div
                ref={drawerRef}
                className="fixed inset-y-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
                style={{
                  width: DRAWER_WIDTH,
                  maxWidth: '85vw',
                  transform: `translate3d(${-DRAWER_WIDTH}px, 0, 0)`,
                  willChange: 'transform',
                }}
              >
                <div className="flex flex-col h-full px-6 py-6">
                  {/* Header */}
                  <div className="flex items-center justify-between shrink-0">
                    <Link href="/" onClick={closeDrawer} className="flex items-center gap-2 text-[#2b35b3] dark:text-blue-400">
                      <Image 
                        src="/icons/Synapse Full logo.png" 
                        alt="Synapse" 
                        width={130} 
                        height={130} 
                        className="h-26 w-auto" 
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-400 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-gray-800 active:scale-95"
                      aria-label="Close menu"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="mt-8 flex flex-col gap-2 flex-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeDrawer}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-[#3b4df8] text-white shadow-md shadow-blue-200/60'
                            : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </nav>

                  {/* Footer Actions */}
                  <div className="shrink-0 pt-6 pb-4 border-t border-slate-200 dark:border-gray-700 mt-auto">
                    {isAuthenticated && user ? (
                      <button
                        onClick={() => {
                          logout();
                          closeDrawer();
                        }}
                        className="w-full rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-gray-300 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-gray-700 active:scale-[0.98]"
                      >
                        Déconnexion
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <Link
                          href="/auth/login"
                          onClick={closeDrawer}
                          className="flex-1 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-gray-300 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-gray-700"
                        >
                          Connexion
                        </Link>
                        <Link
                          href="/auth/register"
                          onClick={closeDrawer}
                          className="flex-1 rounded-full bg-[#3b4df8] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-300/40 transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
                        >
                          S'inscrire
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </header>
  );
}
