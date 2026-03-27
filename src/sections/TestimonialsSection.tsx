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
      className="relative w-full pt-10 pb-12 lg:pt-16 lg:pb-28 professional-bg overflow-hidden z-[70]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 neural-bg opacity-10" />

      <div className="relative z-10 w-full px-5 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 lg:mb-16">
            <span className="inline-block px-3 py-1.5 lg:px-4 lg:py-2 bg-electric/10 text-electric rounded-full text-xs lg:text-sm font-medium mb-3 lg:mb-4">
              Testimonials
            </span>
            <h2 className="display-heading text-display-lg text-foreground mb-3 lg:mb-4">
              WHAT ATTORNEYS SAY
            </h2>
            <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
              Trusted by law firms across the nation for thorough, efficient medical-legal consulting.
            </p>
          </div>

          {/* Testimonial Cards — horizontal scroll on mobile */}
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 mb-8 lg:mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-clinical rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[75vw] snap-center lg:min-w-0"
              >
                {/* Quote icon */}
                <Quote
                  size={28}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 text-electric/20"
                />

                {/* Rating */}
                <div className="flex gap-1 mb-3 lg:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400 lg:w-[18px] lg:h-[18px]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <p className="text-xs lg:text-sm text-text-secondary font-medium">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-6 py-4 lg:px-8 lg:py-6 text-sm lg:text-base rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Work With Our Experts
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
