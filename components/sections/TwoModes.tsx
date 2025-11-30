'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Headphones, Sparkles } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';

export const TwoModes: React.FC = () => {
  return (
    <Section background="white">
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            Two Training Modes
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Two Powerful Ways to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Train Your Mind
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the mode that fits your needs, schedule, and training goals.
            Both backed by sports psychology research.
          </p>
        </motion.div>

        {/* Mode Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AI Coach Mode Card */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border-2 border-blue-200 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Coach</h3>

            {/* Tagline */}
            <p className="text-sm text-blue-700 font-semibold mb-4">
              Interactive | Adaptive | Personalized
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              Have real conversations with an AI mental performance coach. Get instant feedback,
              work through challenges, and receive guidance tailored to your current mental state.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Real-time personalized coaching</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Conversational and adaptive</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Immediate feedback on your mental game</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Works through specific challenges with you</span>
              </li>
            </ul>

            {/* Use When */}
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-gray-900">
                <strong className="text-blue-700">Use when:</strong> You need personalized guidance,
                want to work through a specific challenge, or prefer interactive conversation.
              </p>
            </div>
          </motion.div>

          {/* Training Library Mode Card */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border-2 border-purple-200 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Headphones className="w-8 h-8" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Training Library</h3>

            {/* Tagline */}
            <p className="text-sm text-purple-700 font-semibold mb-4">
              Focused | Sport-Specific | On-Demand
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              Access specialized guided visualization sessions designed for your sport and needs.
              Perfect for pre-competition prep, managing nerves, or building specific mental skills.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Sport-specific visualization scripts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Pre-competition preparation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Nerve and anxiety management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-lg mt-0.5">✓</span>
                <span className="text-sm text-gray-700">Works offline - use anytime, anywhere</span>
              </li>
            </ul>

            {/* Use When */}
            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-gray-900">
                <strong className="text-purple-700">Use when:</strong> You want focused visualization
                practice, need a quick pre-game session, or prefer guided audio without interaction.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default TwoModes;
