'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus, Home, LogOut, Settings } from 'lucide-react';
import { Container } from './Container';
import { useAuthContext } from '@/components/auth/auth-context';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, profile, isAuthenticated, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userName = profile?.displayName || user?.displayName || '';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await signOut();
    setShowProfileMenu(false);
    router.push('/');
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <Image
                src="/icon.svg"
                alt="Athlete Mindset"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Athlete Mindset
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons / Profile Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-300 hover:border-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3f90e8] to-[#3680d8] flex items-center justify-center text-white text-sm font-bold">
                    {getInitials(userName)}
                  </div>
                  <span className="text-gray-700 font-medium">{userName || 'Profile'}</span>
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href="/dashboard">
                        <button
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Home className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700 font-medium">Dashboard</span>
                        </button>
                      </Link>
                      <Link href="/dashboard/profile">
                        <button
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                        >
                          <Settings className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700 font-medium">Profile Settings</span>
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 font-medium">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Log In Button */}
                <Link href="/login">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </motion.button>
                </Link>

                {/* Sign Up Button */}
                <Link href="/signup">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 text-white"
                    style={{
                      background: 'linear-gradient(135deg, #3f90e8 0%, #3680d8 100%)',
                      boxShadow: '0 4px 12px rgba(63, 144, 232, 0.3)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile Log In Button */}
              <Link href="/login">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold mt-4 transition-all w-full border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </motion.button>
              </Link>

              {/* Mobile Sign Up Button */}
              <Link href="/signup">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold mt-2 transition-all w-full"
                  style={{
                    background: 'linear-gradient(135deg, #3f90e8 0%, #3680d8 100%)',
                    boxShadow: '0 4px 12px rgba(63, 144, 232, 0.3)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
