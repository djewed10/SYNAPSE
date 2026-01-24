'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

const DASHBOARD_LINKS = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/dashboard/volets', label: 'Volets', icon: '📚' },
  { href: '/dashboard/modules', label: 'Modules', icon: '📖' },
  { href: '/dashboard/lessons', label: 'Lessons', icon: '✏️' },
  { href: '/dashboard/layers', label: 'Layers', icon: '📊' },
  { href: '/dashboard/statistics', label: 'Statistics', icon: '📈' },
  { href: '/dashboard/playlists', label: 'Playlists', icon: '🎵' },
  { href: '/dashboard/rankings', label: 'Rankings', icon: '🏆' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
      style={{ paddingTop: '64px' }}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <nav className="p-4 space-y-2">
        {DASHBOARD_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded transition',
              pathname === link.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            )}
            title={link.label}
          >
            <span className="text-xl">{link.icon}</span>
            {sidebarOpen && <span className="text-sm">{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
