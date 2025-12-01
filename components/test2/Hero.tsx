"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import PhoneMockup from './mockups/PhoneMockup';
import AppHomeMock from './mockups/AppHomeMock';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-12 overflow-hidden font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <span className="inline-block mb-6 bg-[#e8eef4] text-[#051d38] border-0 px-4 py-1.5 text-sm font-medium rounded-full">
              AI-Powered Mental Training
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#072f57] leading-tight mb-6">
              Train Your Mind
              <br />
              <span className="text-[#0a4a8a]">Like You Train Your Body</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#404040] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              AI-powered mental training for athletes. Personalized visualizations,
              progress tracking, and performance insights – designed to unlock your true potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#051d38] to-[#072f57] text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg transition-all text-base flex items-center justify-center gap-2"
              >
                Start mental training — it's free
              </Link>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="border-2 border-[#072f57] text-[#072f57] font-semibold px-8 py-4 rounded-lg hover:bg-[#e8eef4] transition-all text-base"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <PhoneMockup>
              <AppHomeMock />
            </PhoneMockup>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection('science')}
            className="animate-bounce p-2 rounded-full bg-white/80 shadow-md hover:shadow-lg transition-all"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 text-[#072f57]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
