import { Link } from 'react-router-dom';
import { divisions } from '@/data/divisions';
import { ArrowRight, Stethoscope, Heart, Utensils, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const divisionMeta: Record<string, { icon: typeof Stethoscope; accent: string }> = {
  neurology: { icon: Stethoscope, accent: '#2563EB' },
  'critical-care': { icon: Heart, accent: '#006872' },
  gastroenterology: { icon: Utensils, accent: '#7C3AED' },
  'pain-medicine': { icon: Activity, accent: '#D97706' },
};

export function DivisionsSection() {
  return (
    <section id="divisions" className="relative w-full py-16 lg:py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Our Divisions
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
            Four Focused Divisions. One Standard of Excellence.
          </h2>
          <p className="text-lg text-slate-600">
            ApexMedLaw organizes its expert network into dedicated divisions, each led by physicians who practice in that specialty daily. Deep focus means more thorough reviews and stronger testimony.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {divisions.map((division) => {
            const meta = divisionMeta[division.slug] || { icon: Stethoscope, accent: '#2563EB' };
            const Icon = meta.icon;
            return (
              <Link
                key={division.slug}
                to={`/divisions/${division.slug}`}
                className="group relative"
              >
                <div className="relative bg-clinical border border-slate-200 rounded-2xl p-7 lg:p-8 hover:border-slate-300 transition-all duration-300 hover:shadow-lg h-full flex flex-col overflow-hidden">
                  {/* Colored accent bar */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                    style={{ backgroundColor: meta.accent }}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-navy mb-1">
                        {division.name}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        {division.tagline}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${meta.accent}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: meta.accent }} />
                    </div>
                  </div>

                  {/* Truncated description — 2 lines max */}
                  <p className="text-slate-600 leading-relaxed mb-5 line-clamp-2 flex-grow">
                    {division.description}
                  </p>

                  <div className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all duration-300" style={{ color: meta.accent }}>
                    <span>View Specialties</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 p-6 lg:p-8 bg-clinical border border-slate-200 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-navy mb-3">
            Need a Different Specialty?
          </h3>
          <p className="text-slate-600 mb-5 max-w-2xl mx-auto text-sm">
            ApexMedLaw continues to expand our specialist network. Contact us to discuss your case and learn about available experts in your required specialty.
          </p>
          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-3 rounded-full transition-all hover:-translate-y-0.5"
          >
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
