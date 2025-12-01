"use client";

import React from 'react';
import { Mic, Brain, Target, BarChart3, Calendar, Users } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: Mic,
      title: 'AI Voice Coach',
      description: 'Have natural conversations with your personal AI mental coach anytime, anywhere.',
      comingSoon: false,
    },
    {
      icon: Brain,
      title: 'PETTLEP Visualization',
      description: 'Evidence-based visualization sessions personalized to your sport and goals.',
      comingSoon: false,
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set and track meaningful goals with smart reminders and progress tracking.',
      comingSoon: false,
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your mental training consistency and see your growth over time.',
      comingSoon: false,
    },
    {
      icon: Calendar,
      title: 'Daily Intentions',
      description: 'Start each day with a focused intention to guide your mindset and actions.',
      comingSoon: false,
    },
    {
      icon: Users,
      title: 'Team Features',
      description: 'Share progress with coaches and teammates for collaborative mental training.',
      comingSoon: true,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-[#f5f0eb] to-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Everything you need to train your mind
          </h2>
          <p className="text-lg text-[#404040] max-w-2xl mx-auto">
            Built by athletes for athletes. Every feature is designed with performance in mind.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#f0f0f0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {feature.comingSoon && (
                <span className="absolute top-4 right-4 bg-[#F59E0B]/10 text-[#F59E0B] text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              )}

              <div className="w-12 h-12 bg-[#e8eef4] rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#072f57]" />
              </div>

              <h3 className="text-xl font-bold text-[#072f57] mb-2">{feature.title}</h3>
              <p className="text-[#404040] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
