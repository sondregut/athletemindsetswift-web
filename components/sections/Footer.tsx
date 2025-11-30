'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';
import { Container } from '../landing/Container';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/athletemindsetapp', label: 'Instagram' },
  { icon: Mail, href: 'mailto:sondre@stavhopp.no', label: 'Email' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-16">
          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Logo and Description */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/icon.svg"
                    alt="Athlete Mindset"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </motion.div>
                <span className="text-2xl font-bold">Athlete Mindset</span>
              </div>

              <p className="text-gray-300 mb-6 max-w-md">
                Train your mind like you train your body. AI-powered mental training
                for athletes who want to unlock their true potential.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-gray-400 text-sm">
              2025 Athlete Mindset Inc. All rights reserved.
            </div>

            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
