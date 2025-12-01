"use client";

import React from 'react';
import { Mic, Headphones, Check, Sparkles } from 'lucide-react';
import PhoneMockup from './mockups/PhoneMockup';
import VoiceCoachMock from './mockups/VoiceCoachMock';
import VisualizationLibraryMock from './mockups/VisualizationLibraryMock';

const TrainingModes = () => {
  const modes = [
    {
      icon: Mic,
      title: 'AI Coach',
      subtitle: 'Interactive | Adaptive | Personalized',
      features: [
        'Real-time personalized coaching',
        'Conversational and adaptive',
        'Immediate feedback on your mental game',
      ],
      useWhen: 'You need personalized guidance or want to work through a specific challenge.',
      mockup: <VoiceCoachMock />,
      gradient: true,
    },
    {
      icon: Headphones,
      title: 'Training Library',
      subtitle: 'Focused | Sport-Specific | On-Demand',
      features: [
        'Sport-specific visualization scripts',
        'Pre-competition preparation',
        'Works offline - use anytime, anywhere',
      ],
      useWhen: 'You want focused visualization practice or need a quick pre-game session.',
      mockup: <VisualizationLibraryMock />,
      gradient: false,
    },
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 bg-[#e8eef4] text-[#051d38] px-4 py-1.5 text-sm font-medium rounded-full">
            Two Training Modes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Two Powerful Ways to Train Your Mind
          </h2>
          <p className="text-lg text-[#404040] max-w-2xl mx-auto">
            Choose the mode that fits your needs, schedule, and training goals.
            Both backed by sports psychology research.
          </p>
        </div>

        {/* Side-by-Side Phone Comparison */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          {modes.map((mode, index) => (
            <div key={mode.title} className="flex-1 max-w-md mx-auto lg:mx-0">
              {/* Phone Mockup */}
              <div className="flex justify-center mb-8">
                <PhoneMockup>
                  {mode.mockup}
                </PhoneMockup>
              </div>

              {/* Mode Info Card */}
              <div className={`rounded-2xl p-6 ${
                mode.gradient
                  ? 'bg-gradient-to-br from-[#051d38] to-[#072f57] text-white'
                  : 'bg-white border-2 border-[#e5e5e5]'
              }`}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    mode.gradient ? 'bg-white/20' : 'bg-[#e8eef4]'
                  }`}>
                    <mode.icon className={`w-6 h-6 ${mode.gradient ? 'text-white' : 'text-[#072f57]'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${mode.gradient ? 'text-white' : 'text-[#072f57]'}`}>
                      {mode.title}
                    </h3>
                    <p className={`text-xs ${mode.gradient ? 'text-white/70' : 'text-[#6b6b6b]'}`}>
                      {mode.subtitle}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {mode.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        mode.gradient ? 'text-white' : 'text-[#198754]'
                      }`} />
                      <span className={`text-sm ${mode.gradient ? 'text-white/90' : 'text-[#404040]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Use When */}
                <div className={`p-3 rounded-xl ${mode.gradient ? 'bg-white/10' : 'bg-[#f5f0eb]'}`}>
                  <div className="flex items-start gap-2">
                    <Sparkles className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      mode.gradient ? 'text-white/70' : 'text-[#072f57]'
                    }`} />
                    <p className={`text-xs ${mode.gradient ? 'text-white/80' : 'text-[#404040]'}`}>
                      <strong>Best for:</strong> {mode.useWhen}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrainingModes;
