"use client";

import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceCoachMock = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#072f57] to-[#051d38] p-4 pt-12 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs text-white/60">AI Voice Coach</p>
        <h1 className="text-lg font-bold text-white">Active Session</h1>
      </div>

      {/* Audio Visualizer */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-40 h-40 bg-[#0a4a8a] rounded-full opacity-30 animate-pulse" />
          <div className="absolute inset-2 w-36 h-36 bg-[#0a4a8a] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />

          {/* Main circle */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-[#0a4a8a] to-[#072f57] rounded-full flex items-center justify-center border-2 border-white/20">
            <Volume2 className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Audio bars */}
      <div className="flex items-end justify-center gap-1 h-16 mb-6">
        {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.5].map((height, i) => (
          <div
            key={i}
            className="w-2 bg-white/60 rounded-full animate-pulse"
            style={{
              height: `${height * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Transcript */}
      <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur">
        <p className="text-xs text-white/80 leading-relaxed">
          "Take a deep breath and visualize yourself on the field. Feel the energy of the crowd. You've prepared for this moment..."
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <MicOff className="w-5 h-5 text-white/60" />
        </button>
        <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-sm" />
        </button>
        <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Duration */}
      <div className="text-center">
        <p className="text-2xl font-bold text-white">04:32</p>
        <p className="text-xs text-white/60">Session duration</p>
      </div>
    </div>
  );
};

export default VoiceCoachMock;
