import { Award, GraduationCap, Scale } from 'lucide-react';

const leaders = [
  {
    name: 'Abhi Kapuria, MD',
    title: 'CEO',
    specialty: 'Neurologist | Double Board Certified',
    photo: '/team_kapuria.jpg',
    description: 'Board-certified in general neurology and clinical neurophysiology/epilepsy. Residency and fellowship training at Duke University. Active clinical practice combined with extensive litigation consulting experience across hundreds of cases.',
    highlights: ['Duke University Trained', 'Double Board Certified', 'Deposition & Trial Veteran'],
  },
  {
    name: 'Ovais Inamullah, MD',
    title: 'CMO',
    specialty: 'Neurologist | Vascular Neurology',
    photo: '/team_inamullah.jpg',
    description: 'Double board-certified vascular neuro-hospitalist with extensive litigation experience. Duke University post-graduate training. Expert in acute neurological emergencies and clinical decision-making analysis.',
    highlights: ['Duke University Trained', 'Vascular Neurology', 'Neuro-Hospitalist'],
  },
];

const traits = [
  {
    icon: GraduationCap,
    title: 'Academically Rigorous',
    description: 'Every physician on our team trained at top-tier residency and fellowship programs. Board certified in their practicing specialty.',
  },
  {
    icon: Award,
    title: 'Clinically Active',
    description: 'All experts maintain active patient care, ensuring current knowledge of evolving medical standards and real-world clinical decision-making.',
  },
  {
    icon: Scale,
    title: 'Trial Ready',
    description: 'Experienced in depositions, cross-examination, and courtroom testimony. Daubert-qualified and prepared to withstand the toughest scrutiny.',
  },
];

export function ApexTeamSection() {
  return (
    <section id="team" className="relative w-full py-16 lg:py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Leadership
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
            Physician-Led From the Top
          </h2>
          <p className="text-lg text-slate-600">
            Founded and operated by Duke-trained neurologists who practice medicine and consult on litigation every day. Our leadership doesn't just manage experts — they are experts.
          </p>
        </div>

        {/* Horizontal leader cards — photo beside bio */}
        <div className="space-y-8 mb-12">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 lg:gap-8 bg-clinical rounded-2xl border border-slate-200 p-5 lg:p-6">
              {/* Photo — constrained to ~320px */}
              <div className="flex-shrink-0 md:w-[280px] lg:w-[320px]">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="aspect-[4/5]">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-electric font-semibold text-sm mb-1">
                  {leader.title}
                </p>
                <h3 className="text-2xl font-bold text-navy mb-1">
                  {leader.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {leader.specialty}
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {leader.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {leader.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 bg-electric/10 text-electric text-xs font-semibold rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trait badges — visually connected */}
        <div className="grid sm:grid-cols-3 gap-6">
          {traits.map((trait, index) => {
            const Icon = trait.icon;
            return (
              <div key={index} className="flex flex-col items-start gap-3 p-5 bg-clinical rounded-xl border border-slate-200">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal/10">
                  <Icon className="h-5 w-5 text-teal" />
                </div>
                <h4 className="font-semibold text-navy text-sm">{trait.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {trait.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
