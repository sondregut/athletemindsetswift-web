'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Eye,
  Wind,
  Brain,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const BASE_PATH = '/admindashboard010699';

const navigation = [
  { name: 'Dashboard', href: BASE_PATH, icon: LayoutDashboard },
  { name: 'Visualizations', href: `${BASE_PATH}/visualizations`, icon: Eye },
  { name: 'Breathwork', href: `${BASE_PATH}/breathwork`, icon: Wind },
  { name: 'AOMI Techniques', href: `${BASE_PATH}/aomi`, icon: Brain },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white shadow-sm">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <Link href={BASE_PATH} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900">Athlete Mindset</span>
              <p className="text-[10px] text-slate-500 font-medium">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Content
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== BASE_PATH && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-blue-600" : "text-slate-400"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <p className="text-xs font-medium text-slate-600 mb-1">Voice Agent Content</p>
            <p className="text-[11px] text-slate-500">
              Manage scripts for the LiveKit voice coach
            </p>
          </div>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-slate-400 font-medium">
              v1.0 &middot; Athlete Mindset
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
