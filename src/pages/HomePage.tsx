import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navigation } from '@/components/Navigation';
import { SEO, HomepageSchema, FAQPageSchema } from '@/components/SEO';
import { homepageFaqs } from '@/data/faqs';
import { ApexHeroSection } from '@/sections/ApexHeroSection';
import { ApexTeamSection } from '@/sections/ApexTeamSection';
import { DivisionsSection } from '@/sections/DivisionsSection';
import { ApexServicesSection } from '@/sections/ApexServicesSection';

// Lazy-load below-fold sections
const ByTheNumbersSection = lazy(() => import('@/sections/ByTheNumbersSection').then(m => ({ default: m.ByTheNumbersSection })));
const ApexApproachSection = lazy(() => import('@/sections/ApexApproachSection').then(m => ({ default: m.ApexApproachSection })));
const FAQSection = lazy(() => import('@/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })));

function SectionFallback() {
  return <div className="w-full py-20" />;
}

export function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
    <SEO
      title="ApexMedLaw | Physician-Led Medical-Legal Expert Witness Consulting"
      description="Duke-trained, board-certified physician expert witnesses for medical malpractice, IME, and personal injury cases. Nationwide. 24-hour expert match."
      path="/"
      noTitleSuffix
    />
    <HomepageSchema />
    <FAQPageSchema faqs={homepageFaqs} />
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
