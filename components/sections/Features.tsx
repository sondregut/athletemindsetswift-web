'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Headphones, Target, TrendingUp, Sparkles } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';

const features = [
  {
    icon: MessageCircle,
    title: 'Interactive AI Coach',
    description: 'Talk with an AI sports psychologist anytime, anywhere. Get real-time feedback, personalized guidance, and adaptive mental training sessions. Like having a conversation with a mental performance coach who knows your sport and understands your challenges.',
    bullets: [
      'Personalized 1-on-1 coaching sessions',
      'Real-time feedback and guidance',
      'Adapts to your responses and needs',
      'Available 24/7, no appointments needed'
    ],
    delay: 0.1,
  },
  {
    icon: Headphones,
    title: 'Guided Visualization Library',
    description: 'Access pre-recorded visualization sessions designed for your sport and specific needs. Prepare for competition, manage anxiety, improve technique, or build confidence with expert-crafted audio tracks.',
    bullets: [
      'Pre-competition preparation scripts',
      'Anxiety and nerve management',
      'Technique improvement visualizations',
      'Confidence and mental toughness building',
      'Works offline - train anywhere'
    ],
    delay: 0.2,
  },
  {
    icon: Target,
    title: 'Intention & Reflection System',
    description: 'Set clear goals before each session and reflect on insights afterward. Build self-awareness, track mental patterns, and measure real progress in your mental game.',
    bullets: [
      'Pre-session intention setting',
      'Post-training reflection logging',
      'Pattern and trend recognition',
      'Self-awareness development'
    ],
    delay: 0.3,
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Watch your mental fitness grow with comprehensive tracking. Monitor streaks, moods, performance patterns, and improvements from both AI Coach conversations and Training sessions.',
    bullets: [
      'Training streak tracking',
      'Mood and energy patterns',
      'Performance insights',
      'Personalized progress reports'
    ],
    delay: 0.4,
  },
];

const SolutionOverview: React.FC = () => (
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
      The Solution
    </motion.div>

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
      Meet Athlete Mindset: Your Personal{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
        Mental Training Platform
      </span>
    </h2>

    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
      Athlete Mindset gives you TWO powerful ways to train your mind: an interactive AI Coach
      for personalized guidance and feedback, plus a library of specialized audio visualizations
      for focused training. Both backed by sports psychology and designed to fit your schedule,
      sport, and goals.
    </p>
  </motion.div>
);

export const Features: React.FC = () => {
  return (
    <Section background="white" id="features">
      <Container>
        <SolutionOverview />

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: feature.delay, duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-50 text-blue-600 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon size={32} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">{feature.description}</p>

                {/* Bullets */}
                {feature.bullets && (
                  <ul className="space-y-2 text-sm text-gray-600">
                    {feature.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Features;
