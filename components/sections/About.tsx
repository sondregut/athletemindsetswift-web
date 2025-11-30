'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, GraduationCap, Award, Target } from 'lucide-react';
import { Section } from '../landing/Section';
import { Container } from '../landing/Container';

const AchievementBadge: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  delay: number;
}> = ({ icon: Icon, text, delay }) => (
  <motion.div
    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
    <span className="text-sm text-gray-700">{text}</span>
  </motion.div>
);

export const About: React.FC = () => {
  return (
    <Section id="about" background="warm" padding="md">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About the Founder</h2>
          </motion.div>

          {/* Founder Profile */}
          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Founder Image */}
            <motion.div
              className="relative w-full max-w-2xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Image
                src="/images/sondre-guttormsen.jpg"
                alt="Sondre Guttormsen pole vaulting"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sondre Guttormsen</h3>
              <p className="text-lg text-blue-600 font-semibold">
                Olympic Pole Vaulter & Princeton Psychology Graduate
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <AchievementBadge
                icon={Trophy}
                text="European Indoor Champion 2023"
                delay={0.3}
              />
              <AchievementBadge
                icon={Award}
                text="Norwegian Record Holder (6.00m)"
                delay={0.4}
              />
              <AchievementBadge
                icon={GraduationCap}
                text="3x NCAA Champion"
                delay={0.5}
              />
              <AchievementBadge
                icon={Target}
                text="Two-time Olympian (Tokyo 2020, Paris 2024)"
                delay={0.6}
              />
            </div>

            {/* Bio */}
            <motion.p
              className="text-gray-600 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              As an elite athlete competing at the highest levels, I&apos;ve experienced
              firsthand the critical importance of mental training in athletic performance.
              My background in psychology and sports management drives my mission to make
              professional-level mental training accessible to every athlete.
            </motion.p>
          </motion.div>

          {/* Why I Built This App */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why I Built This App</h3>
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-gray-600">
                After years of working with sports psychologists to improve my mental game, I realized
                that visualization - one of the most powerful tools in an athlete&apos;s arsenal - remains
                largely inaccessible and underutilized.
              </p>
              <p className="text-gray-600">
                This app was born from my own journey and motivation to make professional-level mental
                training accessible to every athlete. Whether you&apos;re preparing for your first competition
                or competing at the Olympics, the mental game is what separates good from great.
              </p>
              <p className="text-gray-600">
                I believe visualization is incredibly powerful yet underutilized in sports. Through this
                app, I want to change that - making it as common and accessible as physical training.
              </p>
            </div>
          </motion.div>

          {/* The Science Behind Visualization */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">The Science Behind Visualization</h3>
            <div className="space-y-4 max-w-3xl mx-auto mb-8">
              <p className="text-gray-700">
                Research in neuroscience and sports psychology consistently shows that mental rehearsal
                activates the same neural pathways as physical practice. When you visualize, you&apos;re
                literally training your brain for success.
              </p>
              <p className="text-gray-700">
                Studies demonstrate that athletes who combine visualization with physical training see
                significant improvements in performance, confidence, and consistency compared to those
                who only train physically.
              </p>
            </div>

            {/* Quote Box */}
            <motion.div
              className="bg-white rounded-2xl p-6 border-l-4 border-blue-600 shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-lg text-gray-900 italic">
                &quot;The mind is the most powerful tool we have - yet most athletes spend 90% of their time
                training the body. Athlete Mindset gives you two powerful ways to train your mind: an AI coach
                for personalized guidance when you need it, and specialized visualizations for focused practice.
                Both make elite-level mental training as accessible as going to the gym.&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
