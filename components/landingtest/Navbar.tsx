"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Programs", href: "#programs" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/landingtest" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#3176FF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AM</span>
            </div>
            <h1 className="font-semibold text-gray-800 text-lg">Athlete Mindset</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-gray-800 font-medium hover:text-[#3176FF] transition"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}

          <Link
            href="/signup"
            className="btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 ml-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="container mx-auto py-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 text-gray-900 hover:text-[#3176FF] border-b border-gray-100"
                onClick={handleLinkClick}
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/signup"
              className="mt-4 btn-primary bg-[#3176FF] hover:bg-[#1E293B] text-white font-medium py-3 px-4 rounded-lg transition text-center"
              onClick={handleLinkClick}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
