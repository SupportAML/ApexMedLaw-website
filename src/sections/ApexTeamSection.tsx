import { Award } from 'lucide-react';

const leaders = [
  {
    name: 'Abhi Kapuria, MD',
    title: 'CEO',
    specialty: 'Neurologist | Double Board Certified',
    description: 'Board-certified in general neurology and clinical neurophysiology/epilepsy. Residency and fellowship training at Duke University. Active clinical practice combined with extensive litigation consulting experience.',
  },
  {
    name: 'Ovais Inamullah, MD',
    title: 'CMO',
    specialty: 'Neurologist | Vascular Neurology',
    description: 'Double board-certified vascular neuro-hospitalist with extensive litigation experience. Duke University post-graduate training. Expert in acute neurological emergencies and clinical decision-making analysis.',
  },
];

export function ApexTeamSection() {
  return (
    <section id="team" className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            Leadership
          </span>
          <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-lg text-slate-600">
            Leading a network of 50+ board-certified physician experts across 20+ medical specialties. Both founders maintain active clinical practices and litigation expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {leaders.map((leader, index) => (
            <div key={index} className="group">
              <div className="relative mb-6">
                <div className="h-48 lg:h-56 bg-gradient-to-br from-electric/5 to-electric/10 rounded-xl flex items-center justify-center border border-slate-200 group-hover:border-electric/30 transition-colors">
                  <Award className="h-24 w-24 text-electric/20" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-1">
                  {leader.name}
                </h3>
                <p className="text-electric font-semibold text-sm mb-2">
                  {leader.title}
                </p>
                <p className="text-slate-600 font-medium mb-3">
                  {leader.specialty}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-clinical rounded-xl p-8 lg:p-12 border border-slate-200">
          <h3 className="text-xl font-bold text-navy mb-4">
            Extensive Specialist Network
          </h3>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Beyond our leadership, ApexMedLaw coordinates a vetted network of 50+ board-certified physicians across critical care medicine, gastroenterology, pain medicine, and other specialties. Every expert maintains active clinical practice, ensuring current knowledge of medical standards and decision-making.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-electric text-xl flex-shrink-0">✓</span>
              <span className="text-slate-700">Board-certified in relevant specialty</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-electric text-xl flex-shrink-0">✓</span>
              <span className="text-slate-700">Active clinical practice maintained</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-electric text-xl flex-shrink-0">✓</span>
              <span className="text-slate-700">Litigation-ready and deposition-trained</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-electric text-xl flex-shrink-0">✓</span>
              <span className="text-slate-700">Multi-state availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
