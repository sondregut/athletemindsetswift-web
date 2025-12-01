"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CTASection = () => {
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
    <section className="py-10 md:py-20 bg-[#101827]">
      <div className="container mx-auto text-center">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-white mb-3 md:mb-6`}>
          Ready to Transform Your Mental Game?
        </h2>
        <p className={`${isMobile ? 'text-sm' : 'text-xl'} text-white/90 mb-5 md:mb-10 max-w-3xl mx-auto`}>
          Join thousands of athletes who are unlocking their full potential with AI-powered mental training.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link
            href="/signup"
            className={`btn-primary bg-[#3176FF] hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition ${isMobile ? 'text-sm' : ''}`}
          >
            Start Free Trial
          </Link>
          <Link
            href="/pricing"
            className={`btn-ghost bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition ${isMobile ? 'text-sm' : ''}`}
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
