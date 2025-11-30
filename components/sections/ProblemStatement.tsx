'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Target } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';

const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  description: string;
  delay: number;
}> = ({ icon: Icon, stat, description, delay }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <motion.div
      className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-8 h-8 text-blue-600" />
    </motion.div>
    <motion.div
      className="text-4xl font-bold text-gray-900 mb-2"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
    >
      {stat}
    </motion.div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export const ProblemStatement: React.FC = () => {
  return (
    <Section background="warm" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Science Behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Mental Training
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Research shows that mental imagery activates the same brain regions as physical execution.
              Elite athletes know this - but most don&apos;t have access to proper mental training.
            </p>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              icon={Trophy}
              stat="90%"
              description="of Olympic athletes use visualization as part of their training"
              delay={0.2}
            />
            <StatCard
              icon={TrendingUp}
              stat="23%"
              description="better performance combining mental + physical practice"
              delay={0.4}
            />
            <StatCard
              icon={Target}
              stat="45%"
              description="performance improvement when visualization is combined with practice"
              delay={0.6}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProblemStatement;
