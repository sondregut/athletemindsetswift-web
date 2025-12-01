"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Trophy, GraduationCap, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const CoachProfile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const achievements = [
    {
      icon: <Award className="text-[#3176FF]" />,
      title: "Olympic Finalist",
      description: "8th place finish at the Olympic Games"
    },
    {
      icon: <Trophy className="text-[#3176FF]" />,
      title: "Collegiate Record Holder",
      description: "6.00m personal best and 3x NCAA Champion"
    },
    {
      icon: <GraduationCap className="text-[#3176FF]" />,
      title: "Sports Psychology Expert",
      description: "Princeton University graduate with Masters in Sports Management"
    }
  ];

  return (
    <section id="about" className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          <div className={`${isMobile ? 'w-2/3' : 'lg:w-1/2'}`}>
            <img
              src="/images/sondre-guttormsen.jpg"
              alt="Coach Sondre"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="mt-2 md:mt-4 flex justify-center">
              <a
                href="https://www.instagram.com/sondre_pv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-[#3176FF] transition-colors"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>@sondre_pv</span>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className={`text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-5`}>
              Meet Your Coach: Sondre
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 mb-3 md:mb-5`}>
              Two-time Olympian and collegiate record holder who understands the mental side of
              athletic performance. Creator of Athlete Mindset, bringing elite-level mental
              training to athletes everywhere.
            </p>
            <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-[#EBF1FF] rounded-full flex items-center justify-center`}>
                    {achievement.icon}
                  </div>
                  <div className="ml-3 md:ml-4">
                    <h4 className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : ''}`}>{achievement.title}</h4>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 mb-4 md:mb-6`}>
              "I built Athlete Mindset because I know firsthand how much the mental game matters.
              The techniques in this app helped me reach the Olympic finals, and now I want to
              make that same training accessible to every athlete."
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/about"
                className={`btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-2 px-4 rounded-lg transition text-center ${isMobile ? 'text-xs py-1' : ''}`}
              >
                Learn More About Sondre
              </Link>
              <a
                href="https://www.instagram.com/sondre_pv"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-outline border-2 border-[#3176FF] text-[#3176FF] hover:bg-[#E6EFFF] font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-1 md:gap-2 ${isMobile ? 'text-xs py-1' : ''}`}
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachProfile;
