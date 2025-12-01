"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const testimonials = [
    {
      quote: "Athlete Mindset completely transformed my pre-competition routine. The visualization sessions helped me stay calm and focused during my biggest competitions. I went from choking under pressure to thriving in high-stakes moments.",
      author: "Sarah Mitchell",
      title: "Olympic Track & Field Athlete",
      subtitle: "Mental game transformed",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      quote: "The AI coach feels like having a sports psychologist in my pocket 24/7. It helped me work through competition anxiety and build mental resilience. My coach noticed the difference in my performance within weeks.",
      author: "Marcus Chen",
      title: "Professional Tennis Player",
      subtitle: "24/7 mental coaching",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      quote: "As a collegiate swimmer, the mental side was always my weakness. The PETTLEP visualization protocols in this app gave me a structured approach to mental training that I never had before. PR'd in every event this season.",
      author: "Emma Rodriguez",
      title: "D1 Collegiate Swimmer",
      subtitle: "PR'd every event",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      quote: "I was skeptical about mental training apps, but Athlete Mindset is different. The personalized sessions based on my sport and goals made it actually relevant. My free throw percentage went up 8% this season.",
      author: "Jordan Williams",
      title: "Professional Basketball Player",
      subtitle: "8% improvement in shooting",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      quote: "The daily intention setting and reflection features helped me stay consistent with my mental training. After 3 months, I'm handling pressure situations in golf that used to make me crumble. Game changer.",
      author: "Alexandra Park",
      title: "LPGA Tour Player",
      subtitle: "Consistent under pressure",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
      quote: "Coming back from injury was as much mental as physical. The visualization sessions helped me see myself competing again when doubt was overwhelming. Athlete Mindset was crucial to my comeback.",
      author: "Tyler Brooks",
      title: "NFL Wide Receiver",
      subtitle: "Crucial for comeback",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const [expandedTestimonials, setExpandedTestimonials] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedTestimonials(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isExpanded = (index: number) => expandedTestimonials.includes(index);

  // Auto scroll the carousel
  useEffect(() => {
    if (!emblaApi) return;

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-8 md:py-14 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            What Athletes Are Saying
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 mt-2 md:mt-4 max-w-3xl mx-auto`}>
            Hear from athletes who have transformed their mental game with Athlete Mindset.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-2 md:pl-4">
                  <div className="testimonial-card bg-white p-4 md:p-8 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg h-full">
                    <div className="flex items-center mb-2 md:mb-4">
                      <div className={`bg-[#3176FF]/10 text-[#3176FF] px-2 md:px-3 py-0.5 md:py-1 rounded-full ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                        {testimonial.subtitle}
                      </div>
                    </div>

                    <div className="relative">
                      <p className={`${isMobile ? 'text-xs' : 'text-gray-700'} mb-3 md:mb-6 ${isExpanded(index) ? "" : "line-clamp-3 md:line-clamp-4"}`}>
                        "{testimonial.quote}"
                      </p>

                      {testimonial.quote.length > 200 && !isExpanded(index) && (
                        <div className="absolute bottom-0 inset-x-0 h-6 md:h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                      )}

                      {testimonial.quote.length > 200 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className={`mt-1 text-[#3176FF] hover:text-[#3176FF]/80 px-0 h-auto font-medium flex items-center gap-1 ${isMobile ? 'text-xs' : ''}`}
                        >
                          {isExpanded(index) ? (
                            <>
                              Read less
                              <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                            </>
                          ) : (
                            <>
                              Read more
                              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center mt-3 md:mt-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-full object-cover border-2 border-[#3176FF]`}
                      />
                      <div className="ml-2 md:ml-4">
                        <h4 className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : ''}`}>{testimonial.author}</h4>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{testimonial.title}</p>
                        <div className="flex items-center mt-0.5 md:mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} fill-[#3176FF] text-[#3176FF]`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center`}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-gray-700`} />
          </button>

          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center`}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-gray-700`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
