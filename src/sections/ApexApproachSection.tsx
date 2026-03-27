import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Specialty Matching',
    description: 'We align expert credentials to your specific case requirements — not just general board certification, but subspecialty expertise in the medical issue at hand.',
  },
  {
    number: '02',
    title: 'Rapid Case Assessment',
    description: 'Quick turnaround on initial case review. We provide preliminary evaluation, liability assessment, and expert availability within days, not weeks.',
  },
  {
    number: '03',
    title: 'Thorough Documentation',
    description: 'Comprehensive written analysis supporting expert qualification. Every report is detailed, well-reasoned, and prepared for scrutiny at deposition and trial.',
  },
  {
    number: '04',
    title: 'Deposition & Trial Ready',
    description: 'Our experts are experienced in depositions, cross-examination, and trial testimony. We prepare thoroughly and communicate complex medical concepts clearly.',
  },
  {
    number: '05',
    title: 'Jurisdictional Expertise',
    description: 'Familiarity with standards of care across multiple jurisdictions. Our experts understand regional practice variations and local legal standards.',
  },
  {
    number: '06',
    title: 'Collaborative Partnership',
    description: 'We work closely with your team, answering questions, refining opinions, and supporting your litigation strategy from case inception through resolution.',
  },
];

export function ApexApproachSection() {
  return (
    <section id="approach" className="relative w-full py-12 lg:py-32 px-5 lg:px-12 bg-clinical">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-8 lg:mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-3 lg:mb-4">
            Efficient Process. Thorough Results.
          </h2>
          <p className="text-base lg:text-lg text-slate-600">
            From first inquiry to courtroom testimony, we move with urgency and precision — because your deadlines don't wait.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3 lg:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-electric text-white font-bold text-sm lg:text-lg">
                  {step.number}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm lg:text-lg font-semibold text-navy mb-1 lg:mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 lg:mt-16 bg-white rounded-xl p-5 lg:p-12 border-2 border-electric/20">
          <h3 className="text-lg lg:text-2xl font-bold text-navy mb-3 lg:mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-electric" />
            Why Attorneys Trust ApexMedLaw
          </h3>
          <div className="space-y-2 lg:space-y-3 text-slate-700 text-sm lg:text-base">
            <p>
              <span className="font-semibold">Subspecialty alignment</span> — Your expert's qualifications match your specific case, not just a general specialty.
            </p>
            <p>
              <span className="font-semibold">Active clinical practice</span> — All experts maintain current patient care, ensuring knowledge of modern standards and decision-making.
            </p>
            <p>
              <span className="font-semibold">Litigation experience</span> — Trained in depositions and trial testimony with clear communication skills that resonate with juries.
            </p>
            <p>
              <span className="font-semibold">Rapid response</span> — Quick turnaround on case reviews and expert availability across multiple jurisdictions.
            </p>
            <p>
              <span className="font-semibold">Daubert-ready</span> — Experts are prepared to withstand qualification challenges in any court.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
