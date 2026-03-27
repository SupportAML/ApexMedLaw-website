import { Link } from 'react-router-dom';
import { divisions } from '@/data/divisions';
import { ArrowRight, Stethoscope, Heart, Utensils, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const divisionIcons = {
  neurology: Stethoscope,
  'critical-care': Heart,
  gastroenterology: Utensils,
  'pain-medicine': Activity,
};

export function DivisionsSection() {
  return (
    <section id="divisions" className="relative w-full py-12 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8 lg:mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Our Divisions
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-3 lg:mb-4">
            Four Focused Divisions. One Standard of Excellence.
          </h2>
          <p className="text-base lg:text-lg text-slate-600">
            ApexMedLaw organizes its expert network into dedicated divisions, each led by physicians who practice in that specialty daily. Deep focus means more thorough reviews and stronger testimony.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 lg:gap-10">
          {divisions.map((division) => {
            const Icon = divisionIcons[division.slug as keyof typeof divisionIcons] || Stethoscope;
            return (
              <Link
                key={division.slug}
                to={`/divisions/${division.slug}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-electric/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-clinical border border-slate-200 rounded-xl lg:rounded-2xl p-4 lg:p-10 hover:border-electric/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-start justify-between mb-2 lg:mb-6">
                    <div>
                      <h3 className="text-base lg:text-3xl font-bold text-navy mb-1 lg:mb-2">
                        {division.name}
                      </h3>
                      <p className="text-slate-600 text-xs lg:text-base hidden lg:block">
                        {division.tagline}
                      </p>
                    </div>
                    <Icon className="h-6 w-6 lg:h-10 lg:w-10 text-electric flex-shrink-0" />
                  </div>

                  <p className="text-slate-700 text-xs lg:text-base leading-relaxed mb-3 lg:mb-6 flex-grow line-clamp-3 lg:line-clamp-none">
                    {division.description}
                  </p>

                  <div className="flex items-center gap-1 lg:gap-2 text-electric font-semibold text-xs lg:text-base group-hover:gap-3 transition-all duration-300">
                    <span>View</span>
                    <ArrowRight size={14} className="lg:hidden" />
                    <span className="hidden lg:inline">Specialties</span>
                    <ArrowRight size={18} className="hidden lg:block" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 lg:mt-16 p-5 lg:p-12 bg-electric/5 border border-electric/20 rounded-xl lg:rounded-2xl text-center">
          <h3 className="text-lg lg:text-2xl font-bold text-navy mb-2 lg:mb-4">
            Need a Different Specialty?
          </h3>
          <p className="text-sm lg:text-base text-slate-700 mb-4 lg:mb-6 max-w-2xl mx-auto">
            ApexMedLaw continues to expand our specialist network. Contact us to discuss your case.
          </p>
          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-electric hover:bg-electric/90 text-white font-medium px-6 py-2 lg:px-8 lg:py-3 text-sm lg:text-base rounded-full transition-all hover:-translate-y-0.5"
          >
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
