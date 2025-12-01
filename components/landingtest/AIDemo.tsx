"use client";

import Link from "next/link";
import { MessageCircle, Mic, Sparkles, Clock, Play } from "lucide-react";
import { useEffect, useState } from "react";

const AIDemo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const features = [
    {
      icon: <Mic className="text-[#3176FF] text-xl" />,
      title: "Voice Conversations",
      description: "Talk naturally with your AI coach - just like having a real conversation with a sports psychologist."
    },
    {
      icon: <Sparkles className="text-[#3176FF] text-xl" />,
      title: "Personalized Guidance",
      description: "Get advice tailored to your sport, goals, and current mental state."
    },
    {
      icon: <Clock className="text-[#3176FF] text-xl" />,
      title: "Available 24/7",
      description: "Access your AI coach anytime - before competitions, after tough losses, or during late-night anxiety."
    },
    {
      icon: <MessageCircle className="text-[#3176FF] text-xl" />,
      title: "Text or Voice",
      description: "Switch seamlessly between typing and speaking based on your preference or situation."
    }
  ];

  return (
    <section className="py-6 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
          <div className="lg:w-2/5 order-2 lg:order-1">
            <div className="relative cursor-pointer rounded-lg shadow-lg w-full overflow-hidden group">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=400&fit=crop"
                  alt="AI Voice Coach Demo"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="w-8 h-8 text-[#3176FF]" />
                  </div>
                </div>
                {/* Animated speaking indicator */}
                <div className="absolute bottom-4 left-4 bg-[#3176FF] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-2 bg-white rounded-full animate-pulse delay-150"></div>
                    <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <span>AI Coach Speaking</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 order-1 lg:order-2">
            <h2 className={`${isMobile ? 'text-lg' : 'text-3xl md:text-4xl'} font-bold mb-2 lg:mb-6 text-gray-900`}>
              Meet Your AI Mental Performance Coach
            </h2>
            <p className={`${isMobile ? 'text-xs' : 'text-lg'} text-gray-600 mb-3 lg:mb-8`}>
              Have natural voice conversations with an AI coach trained in sports psychology.
              Get guidance on pre-competition nerves, post-game analysis, visualization techniques, and building mental resilience.
            </p>
            <div className="space-y-2 lg:space-y-6 mb-3 lg:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${isMobile ? 'w-6 h-6' : 'w-12 h-12'} bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="ml-2 md:ml-4">
                    <h4 className={`${isMobile ? 'text-sm' : 'text-xl'} font-semibold text-gray-900`}>{feature.title}</h4>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/signup"
              className={`inline-block btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-2 px-6 rounded-lg transition ${isMobile ? 'text-xs py-1 px-2' : ''}`}
            >
              Try AI Coach Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;
