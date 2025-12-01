"use client";

import React from 'react';
import { Target, Sparkles, Check, PenLine, Calendar } from 'lucide-react';

const IntentionMock = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#f5f0eb] to-white p-4 pt-12">
      {/* Header */}
      <div className="mb-4">
        <p className="text-xs text-[#6b6b6b]">Monday, December 1</p>
        <h1 className="text-lg font-bold text-[#072f57]">Set Your Intention</h1>
      </div>

      {/* Intention Card */}
      <div className="bg-gradient-to-br from-[#072f57] to-[#0a4a8a] rounded-2xl p-4 mb-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5" />
          <span className="text-sm font-semibold">Today's Focus</span>
        </div>
        <div className="bg-white/10 rounded-xl p-3 mb-3">
          <p className="text-sm leading-relaxed">
            "I will stay calm under pressure and trust my training"
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] opacity-70">
          <Sparkles className="w-3 h-3" />
          <span>AI-suggested based on your recent sessions</span>
        </div>
      </div>

      {/* Quick Intentions */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-[#072f57] mb-2">Quick intentions</p>
        <div className="flex flex-wrap gap-2">
          {['Focus on form', 'Build confidence', 'Stay present', 'Trust myself'].map((intention, i) => (
            <div
              key={i}
              className={`text-[10px] px-3 py-1.5 rounded-full border ${
                i === 0
                  ? 'bg-[#072f57] text-white border-[#072f57]'
                  : 'bg-white text-[#072f57] border-[#e5e5e5]'
              }`}
            >
              {intention}
            </div>
          ))}
        </div>
      </div>

      {/* Write Custom */}
      <div className="bg-white rounded-xl p-3 border border-[#e5e5e5] mb-4">
        <div className="flex items-center gap-2 text-[#6b6b6b]">
          <PenLine className="w-4 h-4" />
          <span className="text-xs">Write your own intention...</span>
        </div>
      </div>

      {/* Recent Reflections */}
      <div className="bg-white rounded-xl p-4 border border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#072f57]">Recent Reflections</span>
          <Calendar className="w-4 h-4 text-[#6b6b6b]" />
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2 bg-[#f5f0eb] rounded-lg">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-medium text-[#072f57]">Yesterday's session</p>
              <p className="text-[10px] text-[#6b6b6b]">"Felt focused and in control during drills"</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-[#f5f0eb] rounded-lg">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-medium text-[#072f57]">Dec 28</p>
              <p className="text-[10px] text-[#6b6b6b]">"Pre-game visualization helped with nerves"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentionMock;
