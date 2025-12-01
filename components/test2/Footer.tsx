"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Apple, FileText, HelpCircle, Image as ImageIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="font-sans">
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#051d38] to-[#072f57]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Unlock Your Mental Potential?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start your journey to mental excellence today. Experience AI-powered mental training
            designed specifically for athletes.
          </p>

          {/* CTA Button */}
          <button className="bg-white text-[#072f57] font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all mb-8">
            Get Started
          </button>

          {/* Secondary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <ImageIcon className="w-4 h-4" />
              View Screenshots
            </Link>
            <Link href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <FileText className="w-4 h-4" />
              Read Documentation
            </Link>
            <Link href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-[#051d38] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/icon.svg"
                  alt="Athlete Mindset"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-white font-bold text-lg">Athlete Mindset</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Train your mind like you train your body. AI-powered mental training for athletes
                who want to unlock their true potential.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-white/60 hover:text-white transition-colors text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-white/60 hover:text-white transition-colors text-sm">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* App Store */}
            <div>
              <h4 className="text-white font-semibold mb-4">Get the App</h4>
              <button className="bg-white/10 backdrop-blur border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Download on App Store
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-white/50 text-sm">
                © 2025 Athlete Mindset Inc. All rights reserved.
              </p>

              {/* Links */}
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/50 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/50 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
                <Link href="/gdpr" className="text-white/50 hover:text-white transition-colors text-sm">
                  GDPR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
