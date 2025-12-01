"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is the app available on Android?',
      answer:
        'We are launching on iOS first, with Android support coming soon. Join our waitlist to be notified when the Android version is available.',
    },
    {
      question: 'What sports does Athlete Mindset support?',
      answer:
        'Athlete Mindset works for all sports! Our AI coach adapts to your specific sport, whether you\'re a soccer player, swimmer, runner, tennis player, or any other athlete. The mental training principles are universal and personalized to your context.',
    },
    {
      question: 'How is this different from meditation apps?',
      answer:
        'Unlike general meditation apps, Athlete Mindset is built specifically for athletic performance. Our AI coach understands sports psychology, competition pressure, and performance goals. Visualizations are personalized to your sport and upcoming events.',
    },
    {
      question: 'Can I use the app offline?',
      answer:
        'Some features require an internet connection (like voice coaching), but visualizations can be downloaded for offline use. We\'re working on expanding offline capabilities.',
    },
    {
      question: 'Is my data private?',
      answer:
        'Absolutely. Your conversations with the AI coach and all personal data are encrypted and never shared. We take athlete privacy seriously and comply with all data protection regulations.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f5f0eb] font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#404040]">
            Everything you need to know about Athlete Mindset
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#f5f0eb]/50 transition-colors"
              >
                <span className="text-[#072f57] font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6b6b6b] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-[#404040] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
