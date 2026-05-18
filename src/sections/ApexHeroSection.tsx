import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Zap, FileCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: FileText, label: 'Step 1 — Share your case details', value: 'Submit Case' },
  { icon: Zap, label: 'Step 2 — Matched with the right expert', value: '< 24 Hours' },
  { icon: FileCheck, label: 'Step 3 — Records reviewed and opinion provided in a timely fashion, with a full report if needed', value: 'Expert Review' },
];

export function ApexHeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!statsRef.current) return;
    const cards = statsRef.current.querySelectorAll('.step-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen hero-canvas-bg overflow-hidden z-10">
      {/* Subtle radial depth gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 30%, rgba(0,104,114,0.06) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />

      <div className="relative z-10 h-full flex items-center min-h-screen">
        <div className="w-full px-6 lg:px-12 pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="display-heading text-display-xl text-white">
                {'Physician-Led '}
                <span className="text-electric">Medical-Legal</span>
                <br />
                {'Consulting'}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                <span className="text-white font-semibold">Founded and led by Duke-trained, double board-certified physicians.</span> Every expert in our network is hand-selected for top-tier credentials, courtroom-ready communication, and proven experience with legal reviews and testimony.
              </p>

              {/* Available Nationwide — inline with subtitle */}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                <span className="font-medium">Available Nationwide</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                >
                  Submit a Case Inquiry
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>

            {/* Process Steps */}
            <div ref={statsRef} className="grid gap-5">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="step-card group relative opacity-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-electric/20 to-electric/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 lg:p-6 hover:bg-white/20 transition-colors duration-300 flex items-center gap-5">
                      <Icon className="h-8 w-8 text-electric flex-shrink-0" />
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-white">
                          {step.value}
                        </div>
                        <div className="text-sm text-slate-300">
                          {step.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
