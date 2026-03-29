import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Award } from 'lucide-react';
import { getDivisionBySlug } from '@/data/divisions';
import { SEO } from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

export function DivisionPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const division = slug ? getDivisionBySlug(slug) : undefined;

  useEffect(() => {
    if (!division) {
      navigate('/');
    }
  }, [division, navigate]);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [slug]);

  if (!division) {
    return null;
  }

  const scrollToContact = () => {
    navigate('/#contact');
  };

  return (
    <>
      <SEO
        title={`${division.name} Expert Witness Services`}
        description={division.description}
        path={`/divisions/${division.slug}`}
      />
      <Navigation />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen hero-canvas-bg overflow-hidden z-10 pt-20">
          <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />

          <div className="relative z-10 h-full flex items-center min-h-screen">
            <div className="w-full px-6 lg:px-12 pb-20">
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 text-white rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                    Part of ApexMedLaw
                  </span>
                </div>

                <h1 className="display-heading text-display-xl text-white">
                  {division.name}
                  <span className="text-electric"> Expert Witness</span>
                  <br />
                  Services
                </h1>

                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {division.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                  >
                    Submit a Case Inquiry
                    <ArrowRight size={20} />
                  </Button>
                  {division.externalUrl && (
                    <a href={division.externalUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full flex items-center gap-2"
                      >
                        Visit Specialized Site
                        <ExternalLink size={20} />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section id="practice-areas" className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="text-display-lg font-bold text-navy mb-4">
                Practice Areas
              </h2>
              <p className="text-lg text-slate-600">
                Our {division.name} specialists provide expert testimony across these core practice areas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {division.practiceAreas.map((area, index) => (
                <div key={index} className="group">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors">
                        <Award className="h-6 w-6 text-electric" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-2">
                        {area.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ApexMedLaw Section */}
        <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-display-lg font-bold text-navy mb-6">
              Why Choose ApexMedLaw for {division.name}?
            </h2>

            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">
                Our {division.name} experts are board-certified physicians who maintain active clinical practices. This combination of litigation experience and real-world clinical involvement ensures authoritative, credible testimony that withstands Daubert scrutiny.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-electric text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Subspecialty Alignment</h4>
                    <p>Expert credentials match the specific medical issue at hand — not just general board certification.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-electric text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Active Clinical Practice</h4>
                    <p>All experts maintain active patient care, ensuring current knowledge of standards and clinical decision-making.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-electric text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Litigation-Ready</h4>
                    <p>Experienced in depositions, trial testimony, and Daubert challenges. We prepare thoroughly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-electric text-xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">Multi-State Coverage</h4>
                    <p>National reach with experts available for cases nationwide, any jurisdiction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-navy text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-display-lg font-bold">
              Ready to Discuss Your Case?
            </h2>
            <p className="text-lg text-slate-300">
              Contact our team to review your case and connect with the right {division.name} expert witness.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              Submit a Case Inquiry
              <ArrowRight size={20} />
            </Button>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <section className="py-8 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="text-electric hover:text-electric/80 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">{division.name}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
