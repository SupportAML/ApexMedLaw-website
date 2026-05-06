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
      {/* Subtle grid pattern for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      <div className="relative z-10 h-full flex items-center min-h-screen">
        <div className="w-full px-6 lg:px-12 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                Available Nationwide
              </div>

              <h1 className="display-heading text-display-xl text-navy">
                Physician-Led
                <span className="text-electric"> Medical-Legal</span>
                <br />
                Consulting
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                <span className="text-navy font-semibold">Founded and led by Duke-trained, double board-certified physicians.</span> Every expert in our network is hand-selected for top-tier credentials, courtroom-ready communication, and proven experience with legal reviews and testimony.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-xl shadow-electric/20 flex items-center gap-2"
                >
                  Submit a Case Inquiry
                  <ArrowRight size={20} />
                </Button>
                <button
                  onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm font-semibold text-navy hover:text-electric transition-colors px-4 py-3"
                >
                  Meet our team →
                </button>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span>Duke-Trained Leadership</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Double Board-Certified</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>HIPAA Compliant</span>
              </div>
            </div>

            {/* Process Steps */}
            <div ref={statsRef} className="grid gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="step-card group relative opacity-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-electric/0 via-electric/20 to-electric/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative glass-card-light rounded-2xl p-5 lg:p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-electric" />
                      </div>
                      <div>
                        <div className="text-xl lg:text-2xl font-bold text-navy leading-tight">
                          {step.value}
                        </div>
                        <div className="text-sm text-slate-600 leading-snug">
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
