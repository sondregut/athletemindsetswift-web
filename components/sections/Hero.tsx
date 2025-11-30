'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '../landing/Container';
import { ImageCarousel } from '../landing/ImageCarousel';

export const Hero: React.FC = () => {

  const promoImages = [
    '/athlete_mindset_image_promo/1.png',
    '/athlete_mindset_image_promo/2.png',
    '/athlete_mindset_image_promo/3.png',
    '/athlete_mindset_image_promo/4.png',
    '/athlete_mindset_image_promo/5.png',
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-4 w-48 h-48 bg-blue-300 rounded-full opacity-15"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Train Your Mind Like You Train Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                Body
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              AI-powered mental training for athletes. Personalized visualizations,
              progress tracking, and performance insights – coming soon.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/signup">
                <motion.button
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 text-gray-900 shadow-lg"
                  style={{
                    background: '#FACC15',
                    boxShadow: '0 8px 24px rgba(250, 204, 21, 0.4)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(250, 204, 21, 0.5)',
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>
                    <span className="font-bold">Start mental training</span>
                    <span className="font-normal"> — it&apos;s free</span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Column - Image Carousel */}
          <motion.div
            className="flex justify-center lg:justify-end px-4 lg:px-0 pb-8 lg:pb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative w-full max-w-md">
              <motion.div
                className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageCarousel images={promoImages} autoPlayInterval={4000} />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⚡
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-xl shadow-lg flex items-center justify-center text-xl"
                animate={{
                  rotate: [0, -10, 10, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🎯
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
