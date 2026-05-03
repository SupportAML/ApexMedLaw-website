import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navigation } from '@/components/Navigation';
import { SEO, OrganizationSchema } from '@/components/SEO';
import { ApexHeroSection } from '@/sections/ApexHeroSection';
import { ApexTeamSection } from '@/sections/ApexTeamSection';
import { DivisionsSection } from '@/sections/DivisionsSection';
import { ApexServicesSection } from '@/sections/ApexServicesSection';

// Lazy-load below-fold sections
const ByTheNumbersSection = lazy(() => import('@/sections/ByTheNumbersSection').then(m => ({ default: m.ByTheNumbersSection })));
const ApexApproachSection = lazy(() => import('@/sections/ApexApproachSection').then(m => ({ default: m.ApexApproachSection })));
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
      <ApexTeamSection />
      <DivisionsSection />
      <ApexServicesSection />
      <Suspense fallback={<SectionFallback />}>
        <ByTheNumbersSection />
        <ApexApproachSection />
        <FAQSection />
        <ContactSection />
      </Suspense>
    </main>
    </>
  );
}
