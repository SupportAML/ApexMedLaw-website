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
    <section id="divisions" className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {divisions.map((division) => {
            const Icon = divisionIcons[division.slug as keyof typeof divisionIcons] || Stethoscope;
            return (
              <Link
                key={division.slug}
                to={`/divisions/${division.slug}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-electric/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-clinical border border-slate-200 rounded-2xl p-8 lg:p-10 hover:border-electric/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-2">
                        {division.name}
                      </h3>
                      <p className="text-slate-600 text-sm lg:text-base">
                        {division.tagline}
                      </p>
                    </div>
                    <Icon className="h-10 w-10 text-electric flex-shrink-0" />
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
                    {division.description}
                  </p>

                  <div className="flex items-center gap-2 text-electric font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>View Specialties</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 p-8 lg:p-12 bg-electric/5 border border-electric/20 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-navy mb-4">
            Need a Different Specialty?
          </h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
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
