"use client";

import React from 'react';
import { Brain, Play, Clock, ChevronRight, Search, Headphones } from 'lucide-react';

const VisualizationLibraryMock = () => {
  const sessions = [
    { title: 'Pre-Competition Focus', duration: '12 min', category: 'Competition' },
    { title: 'Confidence Builder', duration: '8 min', category: 'Mindset' },
    { title: 'Technique Visualization', duration: '10 min', category: 'Skills' },
    { title: 'Managing Nerves', duration: '15 min', category: 'Anxiety' },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-[#f5f0eb] to-white p-4 pt-12">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-[#072f57]">Training Library</h1>
        <p className="text-xs text-[#6b6b6b]">Guided visualizations for your sport</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-[#e5e5e5] mb-4">
        <Search className="w-4 h-4 text-[#6b6b6b]" />
        <span className="text-xs text-[#6b6b6b]">Search sessions...</span>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <div className="bg-[#072f57] text-white text-[10px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
          All
        </div>
        <div className="bg-white text-[#072f57] text-[10px] font-medium px-3 py-1.5 rounded-full border border-[#e5e5e5] whitespace-nowrap">
          Competition
        </div>
        <div className="bg-white text-[#072f57] text-[10px] font-medium px-3 py-1.5 rounded-full border border-[#e5e5e5] whitespace-nowrap">
          Confidence
        </div>
      </div>

      {/* Featured Session */}
      <div className="bg-gradient-to-br from-[#072f57] to-[#0a4a8a] rounded-xl p-4 mb-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Headphones className="w-4 h-4" />
          <span className="text-[10px] font-medium opacity-80">Featured</span>
        </div>
        <h3 className="text-sm font-bold mb-1">Peak Performance</h3>
        <p className="text-[10px] opacity-70 mb-3">Complete mental prep for competition day</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] opacity-70">18 min</span>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-white" fill="white" />
          </div>
        </div>
      </div>

      {/* Session List */}
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-[#e5e5e5]">
            <div className="w-10 h-10 bg-[#e8eef4] rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-[#072f57]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#072f57] truncate">{session.title}</p>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-[#6b6b6b]" />
                <span className="text-[10px] text-[#6b6b6b]">{session.duration}</span>
                <span className="text-[10px] text-[#0a4a8a]">{session.category}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6b6b6b] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizationLibraryMock;
