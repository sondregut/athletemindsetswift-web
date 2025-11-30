'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';


export const FinalCTA: React.FC = () => {
  return (
    <Section background="gradient" className="text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/5 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Main CTA Content */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ready to Unlock Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
              Mental Potential?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Start your journey to mental excellence today. Experience AI-powered mental
            training designed specifically for athletes.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/signup">
              <motion.button
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="w-6 h-6" />
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Links */}
        <motion.div
          className="text-center border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-8 text-blue-200">
            <motion.a
              href="#features"
              className="hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              View Screenshots
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="/docs"
              className="hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Read Documentation
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="/support"
              className="hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FinalCTA;
