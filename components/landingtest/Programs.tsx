"use client";

import Link from "next/link";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Programs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const programs = [
    {
      title: "Free",
      subtitle: "Get started with basic mental training tools.",
      icon: <Sparkles className="text-[#3176FF] text-xl" />,
      features: [
        "Basic visualization sessions",
        "Daily mindset prompts",
        "Progress tracking",
        "Community access",
        "Limited AI interactions"
      ],
      price: "$0",
      priceDetail: "Forever free",
      ctaText: "Get Started",
      ctaLink: "/signup",
      highlighted: false
    },
    {
      title: "Pro",
      subtitle: "Unlock the full power of AI-guided mental training.",
      icon: <Zap className="text-[#3176FF] text-xl" />,
      features: [
        "Unlimited visualization sessions",
        "AI Voice Coach conversations",
        "Personalized training plans",
        "Advanced analytics",
        "Priority support"
      ],
      price: "$19/month",
      priceDetail: "Billed monthly",
      ctaText: "Start Free Trial",
      ctaLink: "/signup",
      highlighted: true
    },
    {
      title: "Elite",
      subtitle: "For serious athletes seeking peak performance.",
      icon: <Crown className="text-[#3176FF] text-xl" />,
      features: [
        "Everything in Pro",
        "1-on-1 coaching sessions",
        "Custom visualization scripts",
        "Team collaboration tools",
        "Dedicated account manager"
      ],
      price: "$99/month",
      priceDetail: "Billed monthly",
      ctaText: "Contact Sales",
      ctaLink: "/contact",
      highlighted: false
    }
  ];

  return (
    <section id="programs" className="py-6 md:py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Choose Your Training Plan
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 mt-2 md:mt-4 max-w-3xl mx-auto`}>
            Select the plan that matches your goals and commitment level.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                program.highlighted ? 'border-2 border-[#3176FF] relative' : 'hover:border hover:border-[#3176FF]'
              }`}
            >
              {program.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-[#3176FF] text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-3 md:p-6 border-b border-gray-100 ${program.highlighted ? 'mt-6' : ''}`}>
                <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-blue-100 rounded-full flex items-center justify-center mb-2 md:mb-4 transition-colors duration-300 hover:bg-[#3176FF] hover:text-white`}>
                  {program.icon}
                </div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{program.title}</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-base'} text-gray-600 mt-1 md:mt-2`}>{program.subtitle}</p>
              </div>
              <div className="p-3 md:p-6 flex-grow">
                <ul className="space-y-1 md:space-y-3">
                  {program.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="text-[#3176FF] h-4 w-4 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-125" />
                      <span className={`ml-2 md:ml-3 text-gray-600 ${isMobile ? 'text-xs' : 'text-base'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 md:p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-base'}`}>{program.priceDetail}</span>
                  <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{program.price}</span>
                </div>
                <Link
                  href={program.ctaLink}
                  className={`block w-full text-center py-2 md:py-3 rounded-lg font-medium transition-all duration-300 ${
                    program.highlighted
                      ? 'bg-[#3176FF] text-white hover:bg-[#1E293B]'
                      : 'bg-white border-2 border-[#3176FF] text-[#3176FF] hover:bg-[#E6EFFF]'
                  } ${isMobile ? 'text-sm' : ''}`}
                >
                  {program.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 md:mt-6 text-center">
          <Link href="/pricing" className="text-[#3176FF] font-medium hover:text-blue-700 flex items-center justify-center gap-2 group transition-all duration-300">
            <span className={isMobile ? 'text-sm' : ''}>Compare all features</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
