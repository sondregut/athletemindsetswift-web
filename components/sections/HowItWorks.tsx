'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Brain, Headphones, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';

const steps = [
  {
    icon: Target,
    title: 'Choose Your Training Mode',
    description: 'Select your training approach: Have a conversation with the AI Coach for interactive guidance, or choose from the Training Library for focused audio visualizations. Both personalized to your sport and goals.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Brain,
    title: 'Set Your Intention',
    description: 'Define what you want to work on - competition prep, technique, confidence, or managing nerves. Our system adapts the content whether you\'re coaching with AI or listening to a visualization track.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Headphones,
    title: 'Train Your Mind',
    description: 'AI Coach Mode: Have a real conversation, get feedback, work through mental blocks together. Training Mode: Listen to expertly-crafted guided visualizations with high-quality narration. Both grounded in sports psychology and PETTLEP methodology.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: BarChart3,
    title: 'Reflect & Track Growth',
    description: 'Log post-session insights and breakthroughs. Track patterns in your mental performance. Watch your mental game strengthen with streaks, analytics, and measurable improvement.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

const StepCard: React.FC<{
  step: typeof steps[0];
  index: number;
  isLast: boolean;
}> = ({ step, index, isLast }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Step Number */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
      >
        {index + 1}
      </motion.div>

      {/* Main Card */}
      <motion.div
        className={`${step.bgColor} rounded-2xl p-6 w-full relative`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        whileHover={{ y: -5 }}
      >
        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4 ${step.iconColor} shadow-sm`}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <step.icon className="w-6 h-6" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{step.description}</p>

        {/* Connector Arrow (Desktop) */}
        {!isLast && (
          <motion.div
            className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        )}

        {/* Connector Line (Mobile) */}
        {!isLast && (
          <motion.div
            className="lg:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            <div className="w-1 h-8 bg-gray-200 rounded-full"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <Section background="warm" id="how-it-works" padding="md">
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
            <Target className="w-4 h-4" />
            How It Works
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Four Simple Steps to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              Mental Excellence
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Athlete Mindset makes mental training as systematic and measurable as physical training.
            Here&apos;s how we help you build an elite mindset.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Mental Game?
            </h3>
            <p className="text-gray-600 mb-6">
              Start your mental training journey today. Experience AI-powered
              visualization and coaching tailored to your sport.
            </p>
            <div className="flex justify-center">
              <Link href="/signup">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <ArrowRight className="w-5 h-5" />
                  Try Now
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default HowItWorks;
