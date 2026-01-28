'use client';

import { ReactNode } from 'react';
import { useUIStore } from '@/store/useUIStore';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-[var(--dashboard-bg)] transition-colors duration-300">
      {children}
    </div>
  );
}
