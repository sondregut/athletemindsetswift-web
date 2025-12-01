"use client";

import React from 'react';
import { Mic, Sparkles, Clock, MessageCircle } from 'lucide-react';
import PhoneMockup from './mockups/PhoneMockup';
import VoiceCoachMock from './mockups/VoiceCoachMock';

const VoiceCoachSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#f5f0eb] to-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 bg-[#e8eef4] text-[#051d38] px-4 py-1.5 text-sm font-medium rounded-full">
            AI Voice Coach
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Meet Your AI Mental Performance Coach
          </h2>
          <p className="text-lg text-[#404040] max-w-2xl mx-auto">
            Have natural voice conversations with an AI coach trained in sports psychology.
            Get guidance on pre-competition nerves, post-game analysis, and building mental resilience.
          </p>
        </div>

        {/* Phone with Callouts Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Phone Mockup - Centered */}
          <div className="flex justify-center">
            <PhoneMockup>
              <VoiceCoachMock />
            </PhoneMockup>
          </div>

          {/* Feature Callouts - Positioned around the phone */}
          {/* Left Side Callouts */}
          <div className="hidden lg:block absolute left-0 top-1/4 transform -translate-y-1/2">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-[#e5e5e5] max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e8eef4] rounded-full flex items-center justify-center">
                    <Mic className="w-5 h-5 text-[#072f57]" />
                  </div>
                  <h4 className="font-semibold text-[#072f57]">Voice Conversations</h4>
                </div>
                <p className="text-sm text-[#404040]">
                  Talk naturally – like a real sports psychologist session
                </p>
              </div>
              {/* Connector Line */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#072f57] to-transparent" />
            </div>
          </div>

          <div className="hidden lg:block absolute left-0 top-2/3 transform -translate-y-1/2">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-[#e5e5e5] max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e8eef4] rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#072f57]" />
                  </div>
                  <h4 className="font-semibold text-[#072f57]">Available 24/7</h4>
                </div>
                <p className="text-sm text-[#404040]">
                  Before competitions, after losses, or late-night anxiety
                </p>
              </div>
              {/* Connector Line */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#072f57] to-transparent" />
            </div>
          </div>

          {/* Right Side Callouts */}
          <div className="hidden lg:block absolute right-0 top-1/4 transform -translate-y-1/2">
            <div className="flex items-center gap-4">
              {/* Connector Line */}
              <div className="w-16 h-0.5 bg-gradient-to-l from-[#072f57] to-transparent" />
              <div className="bg-white rounded-xl p-4 shadow-lg border border-[#e5e5e5] max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e8eef4] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#072f57]" />
                  </div>
                  <h4 className="font-semibold text-[#072f57]">Real-time Guidance</h4>
                </div>
                <p className="text-sm text-[#404040]">
                  AI provides personalized advice tailored to your sport and goals
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 top-2/3 transform -translate-y-1/2">
            <div className="flex items-center gap-4">
              {/* Connector Line */}
              <div className="w-16 h-0.5 bg-gradient-to-l from-[#072f57] to-transparent" />
              <div className="bg-white rounded-xl p-4 shadow-lg border border-[#e5e5e5] max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e8eef4] rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#072f57]" />
                  </div>
                  <h4 className="font-semibold text-[#072f57]">Text or Voice</h4>
                </div>
                <p className="text-sm text-[#404040]">
                  Switch seamlessly based on your preference or situation
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Features in Grid below phone */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Mic, title: 'Voice Conversations', desc: 'Talk naturally – like a real sports psychologist session' },
              { icon: Sparkles, title: 'Real-time Guidance', desc: 'Personalized advice for your sport and goals' },
              { icon: Clock, title: 'Available 24/7', desc: 'Before competitions, after losses, anytime' },
              { icon: MessageCircle, title: 'Text or Voice', desc: 'Switch based on your preference' },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
                <div className="w-10 h-10 bg-[#e8eef4] rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#072f57]" />
                </div>
                <h4 className="font-semibold text-[#072f57] text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-[#404040]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#051d38] to-[#072f57] text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg transition-all">
            Try AI Coach Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default VoiceCoachSection;
