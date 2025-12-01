import Navbar from '@/components/landingtest/Navbar';
import Hero from '@/components/landingtest/Hero';
import Programs from '@/components/landingtest/Programs';
import CoachProfile from '@/components/landingtest/CoachProfile';
import Testimonials from '@/components/landingtest/Testimonials';
import AppFeatures from '@/components/landingtest/AppFeatures';
import AIDemo from '@/components/landingtest/AIDemo';
import BeforeAfter from '@/components/landingtest/BeforeAfter';
import CTASection from '@/components/landingtest/CTASection';
import Footer from '@/components/landingtest/Footer';

export const metadata = {
  title: 'Athlete Mindset - AI-Powered Mental Training for Athletes',
  description: 'Transform your mental game with personalized visualization, AI coaching, and evidence-based mental training techniques used by elite athletes.',
};

export default function LandingTestPage() {
  return (
    <div className="landing-page min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Programs />
      <CoachProfile />
      <Testimonials />
      <AppFeatures />
      <AIDemo />
      <BeforeAfter />
      <CTASection />
      <Footer />
    </div>
  );
}
