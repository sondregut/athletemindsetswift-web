"use client";

import React from 'react';
import { Settings, Target, Brain, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: 'Choose Your Training Mode',
      description: 'Select your training approach: Have a conversation with the AI Coach for interactive guidance, or choose from the Training Library for focused audio visualizations. Both personalized to your sport and goals.',
    },
    {
      number: 2,
      icon: Target,
      title: 'Set Your Intention',
      description: 'Define what you want to work on - competition prep, technique, confidence, or managing nerves. Our system adapts the content whether you\'re coaching with AI or listening to a visualization track.',
    },
    {
      number: 3,
      icon: Brain,
      title: 'Train Your Mind',
      description: 'AI Coach Mode: Have a real conversation, get feedback, work through mental blocks together. Training Mode: Listen to expertly-crafted guided visualizations with high-quality narration. Both grounded in sports psychology and PETTLEP methodology.',
    },
    {
      number: 4,
      icon: TrendingUp,
      title: 'Reflect & Track Growth',
      description: 'Log post-session insights and breakthroughs. Track patterns in your mental performance. Watch your mental game strengthen with streaks, analytics, and measurable improvement.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 bg-[#e8eef4] text-[#051d38] px-4 py-1.5 text-sm font-medium rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Four Simple Steps to Mental Excellence
          </h2>
          <p className="text-lg text-[#404040] max-w-2xl mx-auto">
            Athlete Mindset makes mental training as systematic and measurable as physical training.
            Here's how we help you build an elite mindset.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] right-[-40%] h-0.5 bg-gradient-to-r from-[#072f57] to-[#e8eef4] z-0" />
              )}

              <div className="relative z-10">
                {/* Step number badge */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#051d38] to-[#072f57] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#e8eef4] rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#072f57]" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#072f57] mb-3">{step.title}</h3>
                  <p className="text-[#404040] leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
