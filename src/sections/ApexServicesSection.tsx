import { Button } from '@/components/ui/button';
import { ArrowRight, FileCheck, Users, Briefcase, ClipboardList } from 'lucide-react';

const services = [
  {
    icon: FileCheck,
    title: 'Case Merit Review',
    description: 'Thorough review of medical records with detailed written analysis — identifying deviations from standard of care, causation, and damages. Most reviews completed within 7–10 business days.',
  },
  {
    icon: Users,
    title: 'Expert Testimony',
    description: 'Daubert-qualified physicians prepared for deposition and trial. Our experts translate complex medicine into clear, compelling testimony that resonates with juries.',
  },
  {
    icon: Briefcase,
    title: 'Independent Medical Examination',
    description: 'Objective, well-documented evaluations by clinically active physicians. Defensible reports that withstand cross-examination and challenge.',
  },
  {
    icon: ClipboardList,
    title: 'Subspecialty-Matched Consulting',
    description: 'Your expert\'s training pathway matches the defendant\'s specialty — not just the clinical area. We match on subspecialty, not just department.',
  },
];

export function ApexServicesSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative w-full py-12 lg:py-32 px-5 lg:px-12 bg-clinical">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8 lg:mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-3 lg:mb-4">
            End-to-End Litigation Support
          </h2>
          <p className="text-base lg:text-lg text-slate-600">
            From initial case merit review to courtroom testimony — fast turnaround, meticulous analysis, and experts who communicate with clarity and conviction.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:gap-10 mb-8 lg:mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="group">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors">
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-electric" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-lg font-semibold text-navy mb-1 lg:mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs lg:text-base leading-relaxed">
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
            className="bg-electric hover:bg-electric/90 text-white font-medium px-6 py-4 lg:px-8 lg:py-6 text-sm lg:text-base rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
          >
            Schedule a Consultation
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
