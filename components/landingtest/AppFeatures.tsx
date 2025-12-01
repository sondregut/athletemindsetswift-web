"use client";

import Link from "next/link";
import { Mic, Brain, LineChart, Calendar, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const AppFeatures = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
      title: "AI Voice Coach",
      description: "Have natural conversations with your AI mental performance coach anytime, anywhere."
    },
    {
      icon: <Brain className="text-[#3176FF] text-xl" />,
      title: "PETTLEP Visualization",
      description: "Science-backed visualization sessions personalized for your sport and goals."
    },
    {
      icon: <LineChart className="text-[#3176FF] text-xl" />,
      title: "Progress Analytics",
      description: "Track your mental training consistency, mood patterns, and performance improvements."
    },
    {
      icon: <Calendar className="text-[#3176FF] text-xl" />,
      title: "Daily Intentions",
      description: "Set focused intentions before training and reflect on your progress afterward."
    },
    {
      icon: <Target className="text-[#3176FF] text-xl" />,
      title: "Goal Setting",
      description: "Break down big goals into actionable steps with smart milestone tracking."
    }
  ];

  const appImages = [
    "/athlete_mindset_image_promo/Promo1.png",
    "/athlete_mindset_image_promo/Promo2.png",
    "/athlete_mindset_image_promo/Promo3.png",
    "/athlete_mindset_image_promo/Promo4.png",
    "/athlete_mindset_image_promo/Promo5.png",
  ];

  return (
    <section id="features" className="py-6 md:py-20 bg-[#101827] text-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1 pt-2 lg:pt-0">
            <h2 className={`${isMobile ? 'text-lg' : 'text-3xl md:text-4xl'} font-bold text-white mb-2 lg:mb-6`}>
              Everything You Need for Mental Training
            </h2>
            <p className={`${isMobile ? 'text-xs' : 'text-lg'} text-white/80 mb-3 lg:mb-8`}>
              Get instant access to elite-level mental performance tools designed for serious athletes
              who want to unlock their full potential.
            </p>
            <div className="space-y-2 lg:space-y-6 mb-3 lg:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${isMobile ? 'w-6 h-6' : 'w-12 h-12'} bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="ml-2 md:ml-4">
                    <h4 className={`${isMobile ? 'text-sm' : 'text-xl'} font-semibold text-white`}>{feature.title}</h4>
                    <p className={`text-white/70 ${isMobile ? 'text-xs' : ''}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/signup"
                className={`btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-2 px-6 rounded-lg transition text-center ${isMobile ? 'text-xs py-1 px-2' : ''}`}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 mb-2 lg:mb-0">
            <div className={`relative w-full ${isMobile ? 'min-h-[250px]' : 'min-h-[550px] lg:min-h-[650px]'} flex justify-center items-start`}>
              {/* App carousel */}
              <div className={`w-full ${isMobile ? 'max-w-[180px]' : 'max-w-[340px]'} mx-auto relative`}>
                <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                  <div className="flex">
                    {appImages.map((image, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <div className="p-1">
                          <div className="overflow-hidden rounded-xl border border-white/10 shadow-xl">
                            <img
                              src={image}
                              alt={`App screenshot ${index + 1}`}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/20 hover:bg-white/40 border border-white/30 rounded-full p-1 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} flex items-center justify-center`}
                >
                  <ChevronLeft className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'} text-white`} />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/20 hover:bg-white/40 border border-white/30 rounded-full p-1 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} flex items-center justify-center`}
                >
                  <ChevronRight className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'} text-white`} />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-blue-100/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 md:w-40 md:h-40 bg-[#3176FF]/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
