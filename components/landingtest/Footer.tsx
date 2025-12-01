"use client";

import Link from "next/link";
import { Mail, Instagram, Youtube, Facebook, Twitter, Home, Info, LayoutGrid, MessageSquare, Shield, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#3176FF] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AM</span>
              </div>
              <span className="font-semibold text-lg">Athlete Mindset</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered mental training to help athletes unlock their full potential.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/athletemindset" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3176FF] transition">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3176FF] transition">
                <Youtube size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3176FF] transition">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3176FF] transition">
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/landingtest" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Home size={16} className="text-[#3176FF]" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Info size={16} className="text-[#3176FF]" />
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <LayoutGrid size={16} className="text-[#3176FF]" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#3176FF]" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Shield size={16} className="text-[#3176FF]" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <FileText size={16} className="text-[#3176FF]" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-3">
              <li><Link href="/features/ai-coach" className="text-gray-400 hover:text-white transition">AI Voice Coach</Link></li>
              <li><Link href="/features/visualization" className="text-gray-400 hover:text-white transition">PETTLEP Visualization</Link></li>
              <li><Link href="/features/goals" className="text-gray-400 hover:text-white transition">Goal Setting</Link></li>
              <li><Link href="/features/analytics" className="text-gray-400 hover:text-white transition">Progress Analytics</Link></li>
              <li><Link href="/features/intentions" className="text-gray-400 hover:text-white transition">Daily Intentions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <Mail size={16} className="text-[#3176FF]" />
                </div>
                <span className="ml-3 text-gray-400">support@athletemindset.app</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-8 mb-4">Download the App</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Athlete Mindset. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
