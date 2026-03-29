import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Shield, Clock, Users } from 'lucide-react';

const stats = [
  { icon: Shield, label: 'Clean Malpractice Record', value: '100%' },
  { icon: Clock, label: 'Avg. Case Review Turnaround', value: '7 Days' },
  { icon: Users, label: 'Duke-Trained Physician Leadership', value: 'MD' },
];

export function ApexHeroSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen hero-canvas-bg overflow-hidden z-10">
      <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />

      <div className="relative z-10 h-full flex items-center min-h-screen">
        <div className="w-full px-6 lg:px-12 pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 text-white rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                  Available Nationwide
                </span>
              </div>

              <h1 className="display-heading text-display-xl text-white">
                PHYSICIAN-LED
                <span className="text-electric"> MEDICAL-LEGAL</span>
                <br />
                CONSULTING
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Board-certified, trial-ready physicians delivering thorough case reviews and authoritative expert testimony. Every expert is subspecialty-matched, clinically active, and trained for deposition and courtroom performance.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                >
                  Submit a Case Inquiry
                  <ArrowRight size={20} />
                </Button>
                <a href="tel:9193077949" className="flex items-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full flex items-center gap-2"
                  >
                    <Phone size={20} />
                    Call (919) 307-7949
                  </Button>
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-electric/20 to-electric/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-electric mb-3" />
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm lg:text-base text-slate-300">
                        {stat.label}
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
