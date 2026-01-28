'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/theme-context';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Modules', href: '/dashboard/modules' },
  { label: 'Examen', href: '/dashboard/examen' },
  { label: 'Hack', href: '/dashboard/hack' },
  { label: 'Bibliotheque', href: '/dashboard/bibliotheque' },
  { label: 'Résumé QCM', href: '/dashboard/resume-qcm' },
  { label: 'Statistiques', href: '/dashboard/statistiques' },
  { label: 'Dernierevu', href: '/dashboard/dernierevu' },
  { label: 'Playlists', href: '/dashboard/playlists' },
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

  useLayoutEffect(() => {
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
      href: '/dashboard/modules',
      label: 'Modules',
      icon: (
        <Image src="/headers-pc-icons/qcm-checkbox.png" alt="Modules" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'examen',
      type: 'link',
      href: '/dashboard/examen',
      label: 'Examens',
      icon: (
        <Image src="/headers-pc-icons/chronometer-watch-5-second-svgrepo-com.png" alt="QCM" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'lessons',
      type: 'link',
      href: '/dashboard/lessons',
      label: 'Lessons',
      icon: (
        <Image src="/headers-pc-icons/books-study-learning-education-reading-library-svgrepo-com.png" alt="Lessons" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'back',
      type: 'action',
      label: 'Back',
      onClick: () => window.history.back(),
      icon: (
        <Image src="/headers-pc-icons/arrow-sm-down-svgrepo-com.png" alt="Back" width={16} height={16} className="h-4 w-4 object-contain rotate-180" />
      ),
    },
    {
      key: 'home',
      type: 'link',
      href: '/dashboard',
      label: 'Accueil',
      icon: (
        <Image src="/headers-pc-icons/home-svgrepo-com.png" alt="Home" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'forward',
      type: 'action',
      label: 'Forward',
      onClick: () => window.history.forward(),
      icon: (
        <Image src="/headers-pc-icons/arrow-sm-down-svgrepo-com.png" alt="Forward" width={16} height={16} className="h-4 w-4 object-contain " />
      ),
    },
    {
      key: 'playlists',
      type: 'link',
      href: '/dashboard/playlists',
      label: 'Playlists',
      icon: (
        <Image src="/headers-pc-icons/svg-path.png" alt="Playlists" width={16} height={16} className="h-3 w-3 object-contain" />
      ),
    },
    {
      key: 'hack',
      type: 'link',
      href: '/dashboard/hack',
      label: 'Mode Hack',
      icon: (
        <Image src="/headers-pc-icons/thunder-svgrepo-com.png" alt="Favoris" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'stats',
      type: 'link',
      href: '/dashboard/statistiques',
      label: 'Statistiques',
      icon: (
        <Image src="/headers-pc-icons/statistics-svgrepo-com.png" alt="Stats" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'bibliotheque',
      type: 'link',
      href: '/dashboard/bibliotheque',
      label: 'Bibliothèque',
      icon: (
        <Image src="/headers-pc-icons/books-study-learning-education-reading-library-svgrepo-com.png" alt="Bibliotheque" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'resume-qcm',
      type: 'link',
      href: '/dashboard/resume-qcm',
      label: 'Résumé QCM',
      icon: (
        <Image src="/icons/resumer-qcm-logo.png" alt="Resume QCM" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
    {
      key: 'dernierevu',
      type: 'link',
      href: '/dashboard/dernierevu',
      label: 'Dernierevu',
      icon: (
        <Image src="/icons/eye_icon.png" alt="Dernierevu" width={16} height={16} className="h-4 w-4 object-contain" />
      ),
    },
  ] as const;

  return (
    <header className="top-0 z-30 bg-[var(--background)] transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--primary)] via-[var(--accent-purple)] to-transparent opacity-50" />
      <div className="relative mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-4">
        {/* Brand + menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openDrawer}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] shadow-sm transition hover:shadow-md active:scale-95"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </button>

            <Link href="/" className="flex items-center gap-2 text-[var(--primary)]">
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
        <nav className="hidden lg:flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 shadow-lg">
          {quickActions.map((item) => {
            if (item.type === 'link') {
              const active = isActive(item.href);
              return (
                <div key={item.key} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition ${
                      active ? 'bg-white/20' : 'hover:bg-white/15'
                    }`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </Link>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-3 px-3 py-1.5 text-xs font-medium  bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 pointer-events-none z-50 shadow-lg border border-[var(--border)]">
                    {item.label}
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface-elevated)] rotate-45 border-l border-t border-[var(--border)]" />
                  </span>
                </div>
              );
            }

            return (
              <div key={item.key} className="relative group">
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
                  aria-label={item.label}
                >
                  {item.icon}
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-3 px-3 py-1.5 text-xs font-medium bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-1 pointer-events-none z-50 shadow-lg border border-[var(--border)]">
                  {item.label}
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface-elevated)] rotate-45 border-l border-t border-[var(--border)]" />
                </span>
              </div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex mr-[-40px] items-center ">
          <div className="relative group">
            <button
              onClick={toggleTheme}
              className="relative mr-[-10px] inline-flex h-6 w-14 items-center rounded-full bg-[var(--primary)] px-1 shadow-sm transition-all duration-300 hover:shadow-md active:scale-95"
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
            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs font-medium bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
              {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface-elevated)] border-l border-t border-[var(--border)] rotate-45" />
            </span>
          </div>

          {isAuthenticated && user ? (
            <button
              onClick={logout}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-colors duration-300"
              aria-label="Profile"
            >
              <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-purple)]" />
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
              className="w-[110px]" 
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
                className="fixed inset-y-0 left-0 h-screen bg-[var(--background)] dark:bg-[var(--drawer-bg)] border-r border-[var(--drawer-border)] shadow-2xl overflow-y-auto"
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
                    <Link href="/" onClick={closeDrawer} className="flex items-center gap-2 text-[var(--primary)]">
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
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-hover)] active:scale-95"
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
                            ? 'bg-[var(--primary)] text-white shadow-md'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
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
                  <div className="shrink-0 pt-6 pb-4 border-t border-[var(--border)] mt-auto">
                    {isAuthenticated && user ? (
                      <button
                        onClick={() => {
                          logout();
                          closeDrawer();
                        }}
                        className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-hover)] active:scale-[0.98]"
                      >
                        Déconnexion
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <Link
                          href="/auth/login"
                          onClick={closeDrawer}
                          className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-hover)]"
                        >
                          Connexion
                        </Link>
                        <Link
                          href="/auth/register"
                          onClick={closeDrawer}
                          className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[var(--primary-hover)] active:scale-[0.98]"
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
