import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '4', label: 'Medical Divisions', suffix: '' },
  { value: '50', label: 'States Covered', suffix: '' },
  { value: '7', label: 'Day Avg. Turnaround', suffix: '' },
  { value: '100', label: 'Clean Malpractice Record', suffix: '%' },
];

const caseTypes = [
  'TBI & Concussion',
  'Missed Stroke Diagnosis',
  'ICU Medication Errors',
  'Surgical Complications',
  'Delayed Cancer Diagnosis',
  'Opioid Overprescription',
  'Spinal Cord Injury',
  'Sepsis Mismanagement',
];

export function ByTheNumbersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.metric-card');

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="relative w-full py-16 lg:py-20 px-6 lg:px-12 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 neural-bg opacity-[0.04]" />
      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-electric uppercase tracking-widest">
            By The Numbers
          </span>
          <h2 className="text-display-lg font-bold text-white mt-3">
            Proven Track Record
          </h2>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="metric-card bg-white/5 border border-white/10 rounded-xl p-5 text-center opacity-0"
            >
              <div className="text-3xl lg:text-4xl font-bold text-electric mb-1">
                {metric.value}{metric.suffix}
              </div>
              <div className="text-sm text-white/60">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Case types we handle */}
        <div className="text-center">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
            Case Types We Handle
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {caseTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
