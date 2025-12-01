"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-[#072f57] mb-2">Terms of Service</h1>
        <p className="text-[#6b6b6b] mb-8">Last updated: December 1, 2025</p>

        <div className="prose prose-lg max-w-none text-[#404040]">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using Athlete Mindset's mobile application and website (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
            </p>
            <p>
              These Terms apply to all users of the Service, including visitors, registered users, and subscribers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Athlete Mindset provides AI-powered mental training tools for athletes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Voice coaching sessions with an AI mental performance coach</li>
              <li>Personalized visualization exercises</li>
              <li>Goal tracking and progress analytics</li>
              <li>Mental training libraries and resources</li>
            </ul>
            <p>
              The Service is designed to complement, not replace, professional sports psychology or mental health services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">3. Account Registration</h2>
            <p className="mb-4">To use certain features of the Service, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and account</li>
              <li>Promptly update your account information as needed</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p>
              You must be at least 13 years old to create an account. If you are under 18, you must have parental or guardian consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">4. Subscription and Payments</h2>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Free Tier</h3>
            <p className="mb-4">
              We offer a free tier with limited features, including 3 AI voice coaching sessions and 1 visualization per week.
            </p>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Pro Subscription</h3>
            <p className="mb-4">
              The Pro subscription provides unlimited access to all features. Subscription options include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Monthly: $12.99 per month</li>
              <li>Yearly: $69.99 per year ($5.83/month equivalent)</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Free Trial</h3>
            <p className="mb-4">
              New subscribers receive a 3-day free trial. You may cancel at any time during the trial period without being charged.
            </p>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Billing</h3>
            <p className="mb-4">
              Subscriptions are billed in advance on a recurring basis. Payment is processed through Apple's App Store. By subscribing, you authorize us to charge your payment method automatically.
            </p>

            <h3 className="text-lg font-semibold text-[#072f57] mb-2">Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your device's subscription settings. Cancellation takes effect at the end of the current billing period. No refunds are provided for partial periods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">5. Acceptable Use</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Impersonate another person or entity</li>
              <li>Use the Service to harass, abuse, or harm others</li>
              <li>Reproduce, duplicate, copy, sell, or resell any part of the Service</li>
              <li>Use automated systems or bots to access the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by Athlete Mindset Inc. and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You retain ownership of any content you create or upload to the Service (such as goals and notes). By using the Service, you grant us a limited license to use this content solely to provide the Service to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">7. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
            <p className="mb-4">
              <strong>Important:</strong> Athlete Mindset is not a substitute for professional mental health treatment, medical advice, or sports psychology services. The AI coaching provided is for informational and training purposes only.
            </p>
            <p>
              If you are experiencing mental health issues, please consult a qualified healthcare professional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ATHLETE MINDSET INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Athlete Mindset Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">10. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. Provisions that should survive termination will remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#072f57] mb-4">13. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:legal@athletemindset.app" className="text-[#072f57] hover:underline">
                  legal@athletemindset.app
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
              <Link href="/privacy" className="text-white/50 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
