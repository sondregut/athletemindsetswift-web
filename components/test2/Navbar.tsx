"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Download } from 'lucide-react';

const APP_STORE_URL = '#'; // TODO: Replace with actual App Store URL

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 font-sans ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                alt="Athlete Mindset"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-[#072f57] font-bold text-xl tracking-tight">ATHLETE MINDSET</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#404040] font-medium hover:text-[#072f57] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/login"
              className="text-[#404040] font-medium hover:text-[#072f57] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-[#072f57] font-semibold hover:text-[#051d38] transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={APP_STORE_URL}
              className="bg-gradient-to-r from-[#051d38] to-[#072f57] text-white font-semibold px-5 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#404040] hover:bg-[#e8eef4] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-[#404040] font-medium hover:text-[#072f57] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/login"
              className="block w-full text-left py-2 text-[#404040] font-medium hover:text-[#072f57] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block w-full text-left py-2 text-[#072f57] font-semibold hover:text-[#051d38] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <div className="pt-3 border-t border-[#e5e5e5] space-y-3">
              <Link
                href={APP_STORE_URL}
                className="w-full bg-gradient-to-r from-[#051d38] to-[#072f57] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                Download App
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
