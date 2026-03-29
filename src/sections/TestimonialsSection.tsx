import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Dr. Kapuria clarified a complex neurological issue in a way the jury immediately understood. The case settled favorably shortly after deposition.",
    author: 'Partner, Defense Litigation Firm',
    rating: 5,
  },
  {
    quote:
      "Their turnaround time was exceptional. We had a comprehensive case review within a week that helped us make informed decisions about settlement.",
    author: 'Plaintiff Attorney, Personal Injury Practice',
    rating: 5,
  },
  {
    quote:
      "The level of detail in their IME reports is unmatched. Every question we had was thoroughly addressed with supporting documentation.",
    author: "Workers' Compensation Defense Counsel",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full py-16 lg:py-20 bg-navy overflow-hidden z-[70]"
    >
      <div className="absolute inset-0 neural-bg opacity-[0.04]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="display-heading text-display-lg text-white mb-4">
              WHAT ATTORNEYS SAY
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Trusted by law firms across the nation for thorough, efficient medical-legal consulting.
            </p>
          </div>

          {/* Testimonial Cards — white cards on dark bg */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/15 transition-all duration-300"
              >
                <Quote
                  size={36}
                  className="absolute top-5 right-5 text-electric/20"
                />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-white/90 leading-relaxed mb-6 text-[15px]">
                  "{testimonial.quote}"
                </blockquote>

                <p className="text-sm text-white/50 font-medium">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Work With Our Experts
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
