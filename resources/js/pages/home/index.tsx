import React from 'react'
import PublicLayout from '@/layouts/public-layout'
import HeroSection from './components/hero-section'
import StatsSection from './components/stats-section'
import FeaturesSection from './components/features-section'
import HowItWorksSection from './components/how-it-works-section'
import QrDemoSection from './components/qr-demo-section'
import TestimonialsSection from './components/testimonials-section'
import PricingSection from './components/pricing-section'
import FaqSection from './components/faq-section'
import CtaSection from './components/cta-section'

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <QrDemoSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </PublicLayout>
  )
}

