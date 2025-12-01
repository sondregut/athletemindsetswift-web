"use client";

import React from 'react';
import Image from 'next/image';
import { Trophy, Medal, Award, Star, Quote } from 'lucide-react';

const FounderSection = () => {
  const achievements = [
    { icon: Medal, text: 'European Indoor Champion 2023' },
    { icon: Trophy, text: 'Norwegian Record Holder (6.00m)' },
    { icon: Award, text: '3x NCAA Champion' },
    { icon: Star, text: 'Two-time Olympian (Tokyo 2020, Paris 2024)' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5f0eb] to-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 bg-[#e8eef4] text-[#051d38] px-4 py-1.5 text-sm font-medium rounded-full">
            About the Founder
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto shadow-2xl">
              <Image
                src="/images/sondre-guttormsen.jpg"
                alt="Sondre Guttormsen - Olympic Pole Vaulter representing Norway"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Sondre Guttormsen</h3>
                <p className="text-white/90 text-sm">Olympic Pole Vaulter & Princeton Psychology Graduate</p>
              </div>
            </div>

            {/* Achievements badges */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {achievements.slice(0, 2).map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm"
                >
                  <achievement.icon className="w-4 h-4 text-[#072f57]" />
                  <span className="text-[#072f57] font-medium whitespace-nowrap">{achievement.text.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-6">
              Built by an Elite Athlete Who Understands the Mental Game
            </h2>

            {/* Achievements List */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e5e5e5]">
                  <achievement.icon className="w-5 h-5 text-[#072f57] flex-shrink-0" />
                  <span className="text-sm text-[#404040]">{achievement.text}</span>
                </div>
              ))}
            </div>

            {/* Story */}
            <div className="space-y-4 text-[#404040] mb-8">
              <p>
                As an elite athlete competing at the highest levels, I've experienced firsthand
                the critical importance of mental training in athletic performance. My background
                in psychology and sports management drives my mission to make professional-level
                mental training accessible to every athlete.
              </p>
              <p>
                <strong className="text-[#072f57]">Why I Built This App:</strong> After years of
                working with sports psychologists to improve my mental game, I realized that
                visualization - one of the most powerful tools in an athlete's arsenal - remains
                largely inaccessible and underutilized.
              </p>
              <p>
                This app was born from my own journey and motivation to make professional-level
                mental training accessible to every athlete. Whether you're preparing for your
                first competition or competing at the Olympics, the mental game is what separates
                good from great.
              </p>
            </div>

            {/* Quote */}
            <div className="relative bg-gradient-to-br from-[#051d38] to-[#072f57] rounded-2xl p-6 text-white">
              <Quote className="w-8 h-8 text-white/30 mb-4" />
              <p className="text-lg leading-relaxed mb-4">
                "When I started working on my mind, everything changed. I went from choking under
                pressure to thriving in it - and finally performed in competition the way I knew
                I could. Every athlete deserves access to these tools."
              </p>
              <p className="text-white/70 font-medium">— Sondre Guttormsen</p>
            </div>
          </div>
        </div>

        {/* Science Behind Visualization */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#072f57] mb-4">
            The Science Behind Visualization
          </h3>
          <p className="text-[#404040] leading-relaxed">
            Research in neuroscience and sports psychology consistently shows that mental rehearsal
            activates the same neural pathways as physical practice. When you visualize, you're
            literally training your brain for success. Studies demonstrate that athletes who combine
            visualization with physical training see significant improvements in performance,
            confidence, and consistency compared to those who only train physically.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
