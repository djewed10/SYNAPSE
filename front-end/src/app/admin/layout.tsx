'use client';

import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/layouts';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
