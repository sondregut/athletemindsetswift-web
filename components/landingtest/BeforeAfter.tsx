"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

const BeforeAfter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const beforeItems = [
    "Racing thoughts before competition",
    "Choking under pressure",
    "Inconsistent performance",
    "Negative self-talk loops"
  ];

  const afterItems = [
    "Calm, focused pre-game routine",
    "Thriving in high-stakes moments",
    "Reliable peak performance",
    "Confident, positive mindset"
  ];

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold text-center text-gray-900 mb-8 md:mb-16`}>
          Transform Your Mental Game
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Before Column */}
          <div className="bg-white rounded-lg p-4 md:p-8 border border-gray-200">
            <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-red-500 mb-4 md:mb-8`}>Before Athlete Mindset</h3>
            <div className="mb-4 md:mb-8 rounded-lg overflow-hidden bg-red-50 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="w-10 h-10 md:w-16 md:h-16 text-red-400" />
                </div>
                <p className={`text-red-600 font-medium ${isMobile ? 'text-sm' : ''}`}>Struggling with mental blocks</p>
              </div>
            </div>
            <ul className="space-y-2 md:space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <X className="text-red-500 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="bg-white rounded-lg p-4 md:p-8 border border-gray-200">
            <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-green-600 mb-4 md:mb-8`}>After Athlete Mindset</h3>
            <div className="mb-4 md:mb-8 rounded-lg overflow-hidden bg-green-50 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10 md:w-16 md:h-16 text-green-500" />
                </div>
                <p className={`text-green-600 font-medium ${isMobile ? 'text-sm' : ''}`}>Performing at your peak</p>
              </div>
            </div>
            <ul className="space-y-2 md:space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Check className="text-green-600 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
