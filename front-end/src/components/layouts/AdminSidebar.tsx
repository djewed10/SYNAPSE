'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRBAC } from '@/hooks/useRBAC';
import { cn } from '@/lib/utils';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/activation-codes', label: 'Activation Codes', icon: '🔑' },
  { href: '/admin/volets', label: 'Manage Volets', icon: '📚' },
  { href: '/admin/modules', label: 'Manage Modules', icon: '📖' },
  { href: '/admin/lessons', label: 'Manage Lessons', icon: '✏️' },
  { href: '/admin/qcms', label: 'Manage QCMs', icon: '❓' },
  { href: '/admin/reports', label: 'Reports', icon: '🚨' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isAdmin } = useRBAC();

  if (!isAdmin()) {
    return null;
  }

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
      <nav className="p-6 space-y-2">
        <div className="text-white text-sm font-bold mb-6">Admin Menu</div>
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded transition',
              pathname === link.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            )}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
