'use client';

import { useEffect, useState } from 'react';
import { Eye, Wind, Brain, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { getStats } from '@/lib/admin/firestore';
import Link from 'next/link';

const BASE_PATH = '/admindashboard010699';

export default function DashboardPage() {
  const [stats, setStats] = useState({ visualizations: 0, breathwork: 0, aomi: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Visualizations',
      value: stats.visualizations,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Breathwork',
      value: stats.breathwork,
      icon: Wind,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'AOMI Techniques',
      value: stats.aomi,
      icon: Brain,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-100',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      title: 'Total Content',
      value: stats.visualizations + stats.breathwork + stats.aomi,
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      gradient: 'from-amber-500 to-amber-600',
    },
  ];

  const quickActions = [
    {
      title: 'Visualizations',
      description: 'Guided visualization scripts organized by category',
      icon: Eye,
      href: `${BASE_PATH}/visualizations`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50',
    },
    {
      title: 'Breathwork',
      description: 'Evidence-based breathing techniques',
      icon: Wind,
      href: `${BASE_PATH}/breathwork`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-50',
    },
    {
      title: 'AOMI Techniques',
      description: 'Action Observation & Motor Imagery protocols',
      icon: Brain,
      href: `${BASE_PATH}/aomi`,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      hoverBg: 'hover:bg-violet-50',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Manage your voice coach content library
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className={`border ${stat.borderColor} bg-white shadow-sm hover:shadow-md transition-shadow`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {loading ? (
                  <div className="h-9 w-16 bg-slate-100 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                scripts available
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-blue-500"></span>
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className={`cursor-pointer border border-slate-100 bg-white hover:shadow-lg transition-all duration-200 ${action.hoverBg} group`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl ${action.bgColor} p-3 group-hover:scale-105 transition-transform`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{action.title}</h3>
                        <p className="text-sm text-slate-500">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <Brain className="h-6 w-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">About This Dashboard</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This admin dashboard manages the content library for the Athlete Mindset voice coach.
              Scripts added here are automatically available to the LiveKit agent when athletes start a coaching session.
              The agent uses these templates to guide personalized mental training sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
