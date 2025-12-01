"use client";

import React from 'react';
import { Mic, Brain, Target, BarChart3, Check } from 'lucide-react';
import PhoneMockup from './mockups/PhoneMockup';
import VoiceCoachMock from './mockups/VoiceCoachMock';
import VisualizationLibraryMock from './mockups/VisualizationLibraryMock';
import IntentionMock from './mockups/IntentionMock';
import AnalyticsMock from './mockups/AnalyticsMock';

const FeaturesDetailed = () => {
  const features = [
    {
      icon: Mic,
      title: 'Interactive AI Coach',
      description: 'Talk with an AI sports psychologist anytime, anywhere. Get real-time feedback, personalized guidance, and adaptive mental training sessions.',
      bullets: [
        'Personalized 1-on-1 coaching sessions',
        'Adapts to your responses and needs',
        'Available 24/7, no appointments needed',
      ],
      mockup: <VoiceCoachMock />,
    },
    {
      icon: Brain,
      title: 'Guided Visualization Library',
      description: 'Access pre-recorded visualization sessions designed for your sport and specific needs. Prepare for competition, manage anxiety, or build confidence.',
      bullets: [
        'Sport-specific visualization scripts',
        'Pre-competition preparation',
        'Works offline - train anywhere',
      ],
      mockup: <VisualizationLibraryMock />,
    },
    {
      icon: Target,
      title: 'Intention & Reflection System',
      description: 'Set clear goals before each session and reflect on insights afterward. Build self-awareness and track mental patterns.',
      bullets: [
        'Pre-session intention setting',
        'Post-training reflection logging',
        'Pattern and trend recognition',
      ],
      mockup: <IntentionMock />,
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Watch your mental fitness grow with comprehensive tracking. Monitor streaks, moods, and performance improvements.',
      bullets: [
        'Training streak tracking',
        'Mood and energy patterns',
        'Personalized progress reports',
      ],
      mockup: <AnalyticsMock />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5f0eb] to-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 bg-[#e8eef4] text-[#051d38] px-4 py-1.5 text-sm font-medium rounded-full">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Meet Athlete Mindset: Your Personal Mental Training Platform
          </h2>
          <p className="text-lg text-[#404040] max-w-3xl mx-auto">
            Two powerful ways to train your mind: an interactive AI Coach for personalized guidance,
            plus a library of specialized audio visualizations for focused training.
          </p>
        </div>

        {/* Features with Alternating Layout */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
            >
              {/* Phone Mockup */}
              <div className="lg:w-2/5 flex justify-center">
                <PhoneMockup>
                  {feature.mockup}
                </PhoneMockup>
              </div>

              {/* Content */}
              <div className="lg:w-3/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#051d38] to-[#072f57] rounded-xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#072f57]">{feature.title}</h3>
                </div>

                <p className="text-lg text-[#404040] mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#e8eef4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#072f57]" />
                      </div>
                      <span className="text-[#404040]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesDetailed;
