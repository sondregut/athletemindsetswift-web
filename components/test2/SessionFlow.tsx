"use client";

import React from 'react';
import { Mic, Brain, TrendingUp, ArrowRight } from 'lucide-react';

const SessionFlow = () => {
  const steps = [
    {
      number: 1,
      icon: Mic,
      title: 'Talk to Your Coach',
      description: 'Start a voice session anytime',
      mockContent: (
        <div className="bg-white rounded-lg p-3 shadow-sm border border-[#f0f0f0]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[#e8eef4] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#072f57] rounded-full" />
            </div>
            <span className="text-xs font-medium text-[#072f57]">Voice Coach</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-[#e8eef4] rounded w-3/4" />
            <div className="h-2 bg-[#f0f0f0] rounded w-1/2" />
          </div>
        </div>
      ),
    },
    {
      number: 2,
      icon: Brain,
      title: 'Visualize Success',
      description: 'Guided mental imagery',
      mockContent: (
        <div className="bg-white rounded-lg p-3 shadow-sm border border-[#f0f0f0]">
          <div className="text-[10px] font-medium text-[#6b6b6b] mb-2">Visualization</div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="bg-[#e8eef4] rounded p-1.5">
              <span className="text-[#6b6b6b]">Duration</span>
              <div className="font-semibold text-[#072f57]">8 min</div>
            </div>
            <div className="bg-[#e8eef4] rounded p-1.5">
              <span className="text-[#6b6b6b]">Focus</span>
              <div className="font-semibold text-[#072f57]">Pre-game</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'See your mental growth',
      mockContent: (
        <div className="bg-white rounded-lg p-3 shadow-sm border border-[#f0f0f0]">
          <div className="text-[10px] font-medium text-[#6b6b6b] mb-2">This Week</div>
          <div className="flex items-end gap-1 h-10">
            <div className="w-2 bg-[#e8eef4] rounded-t h-4" />
            <div className="w-2 bg-[#e8eef4] rounded-t h-5" />
            <div className="w-2 bg-[#e8eef4] rounded-t h-6" />
            <div className="w-2 bg-[#0a4a8a] rounded-t h-7" />
            <div className="w-2 bg-[#072f57] rounded-t h-9" />
            <div className="w-2 bg-[#072f57] rounded-t h-10" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Built for athletes on the go
          </h2>
          <p className="text-lg text-[#404040] max-w-2xl mx-auto">
            Train your mind anywhere – before practice, after games, or whenever you need it.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] right-[-40%] h-0.5 bg-gradient-to-r from-[#072f57] to-[#e8eef4] z-0">
                  <ArrowRight className="absolute -right-1 -top-2 w-5 h-5 text-[#e8eef4]" />
                </div>
              )}

              <div className="relative z-10 bg-white">
                {/* Step Number */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#051d38] to-[#072f57] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Mock UI Card */}
                <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
                  {step.mockContent}
                </div>

                {/* Title & Description */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#072f57] mb-2">{step.title}</h3>
                  <p className="text-[#404040]">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionFlow;
