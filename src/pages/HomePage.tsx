import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navigation } from '@/components/Navigation';
import { ApexHeroSection } from '@/sections/ApexHeroSection';
import { DivisionsSection } from '@/sections/DivisionsSection';
import { ApexServicesSection } from '@/sections/ApexServicesSection';
import { ApexTeamSection } from '@/sections/ApexTeamSection';
import { ApexApproachSection } from '@/sections/ApexApproachSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { FAQSection } from '@/sections/FAQSection';
import { ContactSection } from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
    <Navigation />
    <main className="relative">
      <ApexHeroSection />
      <DivisionsSection />
      <ApexServicesSection />
      <ApexTeamSection />
      <ApexApproachSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
    </>
  );
}
