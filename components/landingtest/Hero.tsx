"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className={`w-full ${isMobile ? 'h-[80vh]' : 'h-screen'} relative bg-cover bg-center bg-no-repeat flex items-center justify-center`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className={`flex items-center justify-center ${isMobile ? 'pt-16' : 'pt-4'} w-full h-full`}>
        <div className="w-full md:w-4/5 lg:w-3/5 p-4 md:p-8 lg:p-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center mb-3 md:mb-4">
            Transform Your Mental Game with AI-Powered Training
          </h1>

          <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-center">
            Unlock your peak performance with personalized visualization, AI coaching, and evidence-based mental training techniques used by elite athletes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
            <Link
              href="/signup"
              className={`btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-3 px-8 rounded-lg transition text-center ${isMobile ? 'text-sm' : ''}`}
            >
              Start Free Trial
            </Link>
            <a
              href="#features"
              className={`btn-ghost bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition text-center ${isMobile ? 'text-sm' : ''}`}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
