import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navigation } from '@/components/Navigation';
import { SEO, OrganizationSchema } from '@/components/SEO';
import { ApexHeroSection } from '@/sections/ApexHeroSection';
import { DivisionsSection } from '@/sections/DivisionsSection';
import { ApexServicesSection } from '@/sections/ApexServicesSection';

// Lazy-load below-fold sections
const ByTheNumbersSection = lazy(() => import('@/sections/ByTheNumbersSection').then(m => ({ default: m.ByTheNumbersSection })));
const ApexTeamSection = lazy(() => import('@/sections/ApexTeamSection').then(m => ({ default: m.ApexTeamSection })));
const ApexApproachSection = lazy(() => import('@/sections/ApexApproachSection').then(m => ({ default: m.ApexApproachSection })));
const TestimonialsSection = lazy(() => import('@/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import('@/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })));

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function SectionFallback() {
  return <div className="w-full py-20" />;
}

export function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
    <SEO />
    <OrganizationSchema />
    <Navigation />
    <main className="relative">
      <ApexHeroSection />
      <DivisionsSection />
      <ApexServicesSection />
      <Suspense fallback={<SectionFallback />}>
        <ByTheNumbersSection />
        <ApexTeamSection />
        <ApexApproachSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </Suspense>
    </main>
    </>
  );
}
