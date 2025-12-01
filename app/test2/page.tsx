import Navbar from '@/components/test2/Navbar';
import Hero from '@/components/test2/Hero';
import ScienceStats from '@/components/test2/ScienceStats';
import FeaturesDetailed from '@/components/test2/FeaturesDetailed';
import TrainingModes from '@/components/test2/TrainingModes';
import FounderSection from '@/components/test2/FounderSection';
import HowItWorks from '@/components/test2/HowItWorks';
import VoiceCoachSection from '@/components/test2/VoiceCoachSection';
import Pricing from '@/components/test2/Pricing';
import FAQ from '@/components/test2/FAQ';
import Footer from '@/components/test2/Footer';

export const metadata = {
  title: 'Athlete Mindset - AI-Powered Mental Training for Athletes',
  description: 'Transform your mental game with personalized visualization, AI coaching, and evidence-based mental training techniques used by elite athletes.',
};

export default function Test2Page() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <ScienceStats />
        <HowItWorks />
        <FeaturesDetailed />
        <TrainingModes />
        <VoiceCoachSection />
        <FounderSection />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
