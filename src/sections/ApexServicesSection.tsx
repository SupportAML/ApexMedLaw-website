import { Button } from '@/components/ui/button';
import { ArrowRight, FileCheck, Users, Briefcase, ClipboardList } from 'lucide-react';

const services = [
  {
    icon: FileCheck,
    title: 'Case Review',
    description: 'Comprehensive review of medical records, identification of deviations from standard of care, and detailed written analysis to support your litigation strategy.',
  },
  {
    icon: Users,
    title: 'Expert Testimony',
    description: 'Board-certified physician testimony prepared for depositions and trial. We ensure Daubert-ready expert qualification across all jurisdictions.',
  },
  {
    icon: Briefcase,
    title: 'Independent Medical Examination (IME)',
    description: 'Objective medical evaluation with detailed reporting. Our physicians are experienced in IME procedures and produce compelling, defensible assessments.',
  },
  {
    icon: ClipboardList,
    title: 'Standards of Care Review',
    description: 'In-depth analysis of medical decision-making against applicable standards of care. Tailored to specific medical specialty and jurisdiction.',
  },
];

export function ApexServicesSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-clinical">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
            Comprehensive Expert Witness Services
          </h2>
          <p className="text-lg text-slate-600">
            From case review to courtroom testimony, ApexMedLaw provides end-to-end expert witness support tailored to your litigation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors">
                      <Icon className="h-6 w-6 text-electric" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
          >
            Schedule a Consultation
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
