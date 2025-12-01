"use client";

import React, { useState } from 'react';
import { Check, Zap, Star, Crown } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const tiers = [
    {
      name: 'Free',
      icon: Zap,
      price: 'Free',
      period: '',
      description: 'Perfect for trying out',
      features: [
        '3 AI voice coaching sessions',
        '1 Visualization per week',
        'Basic goal tracking',
        'Daily check-ins',
        'Limited analytics',
      ],
      cta: 'Get Started',
      popular: false,
      comingSoon: false,
    },
    {
      name: 'Pro',
      icon: Star,
      price: isYearly ? '$69.99' : '$12.99',
      period: isYearly ? '/year' : '/mo',
      yearlyNote: isYearly ? '$5.83/mo · Save 55%' : '',
      description: 'Unlock your full mental performance potential',
      features: [
        'Unlimited AI voice coaching sessions',
        'Personalized mental training plans',
        'Advanced visualization exercises',
        'Goal tracking & progress analytics',
        'Daily check-ins & journaling',
      ],
      cta: 'Start 3-Day Free Trial',
      popular: true,
      comingSoon: false,
    },
    {
      name: 'Team',
      icon: Crown,
      price: '$TBD',
      period: '/mo',
      description: 'For coaches and teams',
      features: [
        'Manage multiple athletes',
        'Team analytics dashboard',
        'Shared visualization library',
        'Coach-athlete messaging',
        'Export team reports',
      ],
      cta: 'Coming Soon',
      popular: false,
      comingSoon: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-4">Simple Pricing</h2>
          <p className="text-lg text-[#404040] mb-8">
            Start for free. Upgrade for unlimited mental training.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-[#e8eef4] rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-[#072f57] text-white shadow-sm'
                  : 'text-[#404040] hover:text-[#072f57]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isYearly
                  ? 'bg-[#072f57] text-white shadow-sm'
                  : 'text-[#404040] hover:text-[#072f57]'
              }`}
            >
              Yearly (Save 55%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 ${
                tier.popular
                  ? 'bg-gradient-to-br from-[#051d38] to-[#072f57] text-white shadow-2xl scale-105'
                  : 'bg-white border border-[#e5e5e5] shadow-sm'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-xs px-4 py-1 rounded-full font-medium">
                  Most Popular
                </span>
              )}

              {tier.comingSoon && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6b6b6b] text-white text-xs px-4 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    tier.popular ? 'bg-white/20' : 'bg-[#e8eef4]'
                  }`}
                >
                  <tier.icon
                    className={`w-7 h-7 ${tier.popular ? 'text-white' : 'text-[#072f57]'}`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    tier.popular ? 'text-white' : 'text-[#072f57]'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    tier.popular ? 'text-white/80' : 'text-[#6b6b6b]'
                  }`}
                >
                  {tier.description}
                </p>

                <div className="mb-2">
                  <span
                    className={`text-4xl font-bold ${
                      tier.popular ? 'text-white' : 'text-[#072f57]'
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={`text-lg ${tier.popular ? 'text-white/70' : 'text-[#6b6b6b]'}`}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>
                {tier.yearlyNote && (
                  <p className={`text-xs ${tier.popular ? 'text-white/70' : 'text-[#198754]'}`}>
                    {tier.yearlyNote}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.popular ? 'text-white' : 'text-[#198754]'
                      }`}
                    />
                    <span
                      className={`text-sm ${tier.popular ? 'text-white/90' : 'text-[#404040]'}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 text-base font-semibold rounded-xl transition-all ${
                  tier.popular
                    ? 'bg-white text-[#072f57] hover:bg-white/90'
                    : tier.comingSoon
                    ? 'bg-[#e5e5e5] text-[#6b6b6b] cursor-not-allowed'
                    : 'bg-[#072f57] text-white hover:bg-[#0a4a8a]'
                }`}
                disabled={tier.comingSoon}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-[#6b6b6b] mt-8">
          All paid plans include a 3-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
