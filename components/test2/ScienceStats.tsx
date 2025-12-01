"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Brain } from 'lucide-react';

const ScienceStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 90,
      suffix: '%',
      label: 'of Olympic athletes use visualization as part of their training',
    },
    {
      value: 23,
      suffix: '%',
      label: 'better performance combining mental + physical practice',
    },
    {
      value: 45,
      suffix: '%',
      label: 'performance improvement when visualization is combined with practice',
    },
  ];

  return (
    <section id="science" ref={sectionRef} className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e8eef4] rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-[#072f57]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            The Science Behind Mental Training
          </h2>
          <p className="text-lg text-[#404040] max-w-3xl mx-auto">
            Research shows that mental imagery activates the same brain regions as physical execution.
            Elite athletes know this - but most don't have access to proper mental training.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gradient-to-br from-[#f5f0eb] to-white rounded-2xl border border-[#e5e5e5]"
            >
              <div className="mb-4">
                <span className={`text-5xl sm:text-6xl font-bold text-[#072f57] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {isVisible ? stat.value : 0}{stat.suffix}
                </span>
              </div>
              <p className="text-[#404040] leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScienceStats;
