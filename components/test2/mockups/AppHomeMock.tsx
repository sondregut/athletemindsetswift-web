"use client";

import React from 'react';
import { Brain, Mic, Target, BarChart3, Calendar, ChevronRight } from 'lucide-react';

const AppHomeMock = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#f5f0eb] to-white p-4 pt-12">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-[#6b6b6b]">Good morning,</p>
        <h1 className="text-lg font-bold text-[#072f57]">Sarah</h1>
      </div>

      {/* Daily Intention Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5] mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-[#e8eef4] rounded-full flex items-center justify-center">
            <Target className="w-4 h-4 text-[#072f57]" />
          </div>
          <span className="text-sm font-semibold text-[#072f57]">Today's Intention</span>
        </div>
        <p className="text-xs text-[#404040]">"I will stay calm under pressure and trust my training"</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-[#072f57] to-[#0a4a8a] rounded-xl p-3 text-white">
          <Mic className="w-5 h-5 mb-2" />
          <p className="text-xs font-medium">Voice Coach</p>
          <p className="text-[10px] opacity-70">Start session</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-[#e5e5e5]">
          <Brain className="w-5 h-5 mb-2 text-[#072f57]" />
          <p className="text-xs font-medium text-[#072f57]">Visualize</p>
          <p className="text-[10px] text-[#6b6b6b]">5 min session</p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#072f57]">Recent Sessions</span>
          <ChevronRight className="w-4 h-4 text-[#6b6b6b]" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-[#f5f0eb] rounded-lg">
            <div className="w-8 h-8 bg-[#e8eef4] rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-[#072f57]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-[#072f57]">Pre-game focus</p>
              <p className="text-[10px] text-[#6b6b6b]">12 min • Yesterday</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-[#f5f0eb] rounded-lg">
            <div className="w-8 h-8 bg-[#e8eef4] rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#072f57]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-[#072f57]">Victory visualization</p>
              <p className="text-[10px] text-[#6b6b6b]">8 min • 2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] px-6 py-3 flex justify-around">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-[#072f57] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-[8px] text-[#072f57] mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center opacity-50">
          <Calendar className="w-5 h-5 text-[#6b6b6b]" />
          <span className="text-[8px] text-[#6b6b6b] mt-1">Plan</span>
        </div>
        <div className="flex flex-col items-center opacity-50">
          <BarChart3 className="w-5 h-5 text-[#6b6b6b]" />
          <span className="text-[8px] text-[#6b6b6b] mt-1">Progress</span>
        </div>
      </div>
    </div>
  );
};

export default AppHomeMock;
