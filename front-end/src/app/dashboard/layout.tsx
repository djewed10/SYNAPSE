'use client';

import { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/layouts';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-[var(--dashboard-bg)]">
     
        {children}
    </div>
  );
}
