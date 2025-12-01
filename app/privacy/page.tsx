"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                alt="Athlete Mindset"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-[#072f57] font-bold text-lg">ATHLETE MINDSET</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-[#072f57] hover:text-[#0a4a8a] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-2">Privacy Policy</h1>
        <p className="text-[#6b6b6b] mb-8">Last updated: December 1, 2025</p>

        <div className="prose prose-lg max-w-none text-[#404040]">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">1. Introduction</h2>
            <p className="mb-4">
              Athlete Mindset Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Personal Information</h3>
            <p className="mb-4">When you create an account or use our Service, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name and email address</li>
              <li>Sport and athletic discipline</li>
              <li>Training goals and preferences</li>
              <li>Voice recordings during coaching sessions (processed in real-time, not stored)</li>
              <li>Usage data and app interactions</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Automatically Collected Information</h3>
            <p className="mb-4">We automatically collect certain information when you use our Service:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Device information (type, operating system, unique identifiers)</li>
              <li>Log data (access times, pages viewed, app crashes)</li>
              <li>Analytics data to improve our Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Personalize your mental training experience</li>
              <li>Generate AI-powered coaching and visualizations tailored to your sport</li>
              <li>Track your progress and provide performance insights</li>
              <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">4. Data Storage and Security</h2>
            <p className="mb-4">
              We use industry-standard security measures to protect your personal information. Your data is stored on secure servers provided by Google Cloud Platform and Firebase, which employ encryption and access controls.
            </p>
            <p className="mb-4">
              Voice coaching sessions are processed in real-time using secure WebRTC connections. Audio is not permanently stored on our servers.
            </p>
            <p>
              While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">5. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services to operate our Service:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Firebase (Google)</strong> - Authentication, database, and analytics</li>
              <li><strong>Google Cloud Platform</strong> - AI services and infrastructure</li>
              <li><strong>LiveKit</strong> - Real-time voice communication</li>
              <li><strong>RevenueCat</strong> - Subscription management</li>
            </ul>
            <p>
              These services have their own privacy policies governing their use of your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">6. Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of promotional communications</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href="mailto:privacy@athletemindset.app" className="text-[#072f57] hover:underline">
                privacy@athletemindset.app
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">7. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@athletemindset.app" className="text-[#072f57] hover:underline">
                  privacy@athletemindset.app
                </a>
              </li>
              <li>
                <strong>Support:</strong>{" "}
                <a href="mailto:support@athletemindset.app" className="text-[#072f57] hover:underline">
                  support@athletemindset.app
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#051d38] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © 2025 Athlete Mindset Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
