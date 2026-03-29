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
    <section id="approach" className="relative w-full py-16 lg:py-24 px-6 lg:px-12 bg-clinical">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
            Efficient Process. Thorough Results.
          </h2>
          <p className="text-lg text-slate-600">
            From first inquiry to courtroom testimony, we move with urgency and precision — because your deadlines don't wait.
          </p>
        </div>

        {/* Visual timeline */}
        <div className="relative">
          {/* Vertical connecting line — desktop only */}
          <div className="hidden lg:block absolute left-7 top-8 bottom-8 w-px bg-slate-300" />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-5 lg:gap-8 lg:py-5">
                {/* Timeline node */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-electric text-white font-bold text-sm border-4 border-clinical">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow pb-2">
                  <h3 className="text-lg font-semibold text-navy mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
