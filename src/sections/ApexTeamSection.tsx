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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {leaders.map((leader, index) => (
            <div key={index} className="group">
              {/* Headshot */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] relative">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-electric font-semibold text-sm mb-1">
                      {leader.title}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {leader.specialty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-700 leading-relaxed mb-4">
                {leader.description}
              </p>

              {/* Highlight Badges */}
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
          ))}
        </div>

        {/* Why This Matters */}
        <div className="bg-clinical rounded-xl p-8 lg:p-12 border border-slate-200">
          <h3 className="text-xl font-bold text-navy mb-6">
            What Sets Our Experts Apart
          </h3>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10">
                <GraduationCap className="h-6 w-6 text-electric" />
              </div>
              <h4 className="font-semibold text-navy">Academically Rigorous</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every physician on our team trained at top-tier residency and fellowship programs. Board certified in their practicing specialty.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10">
                <Award className="h-6 w-6 text-electric" />
              </div>
              <h4 className="font-semibold text-navy">Clinically Active</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                All experts maintain active patient care, ensuring current knowledge of evolving medical standards and real-world clinical decision-making.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10">
                <Scale className="h-6 w-6 text-electric" />
              </div>
              <h4 className="font-semibold text-navy">Trial Ready</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Experienced in depositions, cross-examination, and courtroom testimony. Daubert-qualified and prepared to withstand the toughest scrutiny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
