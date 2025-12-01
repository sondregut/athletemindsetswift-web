"use client";

import React from 'react';
import { BarChart3, TrendingUp, Flame, Calendar, Brain, Mic } from 'lucide-react';

const AnalyticsMock = () => {
  const weeklyData = [0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="h-full bg-gradient-to-b from-[#f5f0eb] to-white p-4 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-[#072f57]">Progress</h1>
          <p className="text-xs text-[#6b6b6b]">Your mental training insights</p>
        </div>
        <Calendar className="w-5 h-5 text-[#6b6b6b]" />
      </div>

      {/* Streak Card */}
      <div className="bg-gradient-to-br from-[#072f57] to-[#0a4a8a] rounded-2xl p-4 mb-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-xs opacity-80">Day streak</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-bold">+23%</span>
            </div>
            <p className="text-xs opacity-80">vs last week</p>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl p-4 border border-[#e5e5e5] mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#072f57]">This Week</span>
          <span className="text-[10px] text-[#6b6b6b]">7 sessions</span>
        </div>
        <div className="flex items-end justify-between h-20 gap-1">
          {weeklyData.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm ${
                  i === 4 ? 'bg-[#072f57]' : 'bg-[#e8eef4]'
                }`}
                style={{ height: `${height * 100}%` }}
              />
              <span className={`text-[8px] ${i === 4 ? 'text-[#072f57] font-bold' : 'text-[#6b6b6b]'}`}>
                {days[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-3 border border-[#e5e5e5]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#e8eef4] rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#072f57]" />
            </div>
          </div>
          <p className="text-lg font-bold text-[#072f57]">24</p>
          <p className="text-[10px] text-[#6b6b6b]">Coach sessions</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-[#e5e5e5]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#e8eef4] rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#072f57]" />
            </div>
          </div>
          <p className="text-lg font-bold text-[#072f57]">18</p>
          <p className="text-[10px] text-[#6b6b6b]">Visualizations</p>
        </div>
      </div>

      {/* Mood Trend */}
      <div className="bg-white rounded-xl p-4 border border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#072f57]">Mental State Trend</span>
          <BarChart3 className="w-4 h-4 text-[#6b6b6b]" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-[#e8eef4] rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-[#072f57] to-[#0a4a8a] rounded-full" />
          </div>
          <span className="text-xs font-bold text-[#072f57]">75%</span>
        </div>
        <p className="text-[10px] text-[#6b6b6b] mt-2">Confidence level improving steadily</p>
      </div>
    </div>
  );
};

export default AnalyticsMock;
