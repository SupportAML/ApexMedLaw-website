import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { CaseReviewCTA } from '@/components/CaseReviewCTA';
import { ArrowRight, ExternalLink, Award, FileText, HelpCircle, Scale, ClipboardCheck, Calendar } from 'lucide-react';
import { getDivisionBySlug } from '@/data/divisions';
import { getPhysiciansBySpecialty } from '@/data/physicians';
import { getPostsByDivision } from '@/blog/posts';
import { SEO } from '@/components/SEO';
import { DivisionSchema, FAQSchema, BreadcrumbSchema } from '@/components/SEOSchemas';

gsap.registerPlugin(ScrollTrigger);

export function DivisionPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const division = slug ? getDivisionBySlug(slug) : undefined;
  const specialtyPhysicians = slug ? getPhysiciansBySpecialty(slug) : [];
  const relatedPosts = slug ? getPostsByDivision(slug) : [];

  useEffect(() => {
    if (!division) {
      navigate('/');
    }
  }, [division, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <DivisionSchema
        name={division.name}
        description={division.description}
        slug={division.slug}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Divisions', url: '/#divisions' },
          { name: division.name, url: `/divisions/${division.slug}` },
        ]}
      />
      {division.faqs && division.faqs.length > 0 && <FAQSchema faqs={division.faqs} />}
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
                  {specialtyPhysicians.length > 0 && (
                    <a href="#our-experts">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-full flex items-center gap-2"
                      >
                        Meet Our {division.name} Experts
                        <ArrowRight size={20} />
                      </Button>
                    </a>
                  )}
                  {division.externalUrl && (
                    <a href={division.externalUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-full flex items-center gap-2"
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

        {/* Our Experts Section */}
        {specialtyPhysicians.length > 0 && (
          <section id="our-experts" className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mb-12">
                <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                  Our Experts
                </span>
                <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
                  {division.name} Experts
                </h2>
                <p className="text-lg text-slate-600">
                  Board-certified physicians available to review cases and provide expert testimony in {division.name.toLowerCase()}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {specialtyPhysicians.map((doc) => (
                  <Link
                    key={doc.slug}
                    to={`/experts/${doc.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-clinical-100">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-base text-navy mb-1 line-clamp-1">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-1">{doc.role}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-electric group-hover:gap-2 transition-all">
                        View Profile <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Overview Section */}
        {division.overview && division.overview.length > 0 && (
          <section className="relative w-full py-16 lg:py-20 px-6 lg:px-12 bg-white border-b border-slate-100">
            <div className="max-w-3xl mx-auto">
              <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                Overview
              </span>
              <h2 className="text-display-md font-bold text-navy mt-3 mb-6">
                {division.name} Expert Witness Consulting
              </h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                {division.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practice Areas Section */}
        <section id="practice-areas" className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
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

        {/* Case Types Handled */}
        {division.caseTypes && division.caseTypes.length > 0 && (
          <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                  Case Types
                </span>
                <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
                  {division.name} Cases We Handle
                </h2>
                <p className="text-lg text-slate-600">
                  Attorneys retain our {division.name.toLowerCase()} experts for matters including:
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {division.caseTypes.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <FileText className="h-5 w-5 text-electric shrink-0 mt-1" />
                    <span className="text-slate-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Sample Expert-Witness Questions */}
        {division.expertQuestions && division.expertQuestions.length > 0 && (
          <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                  Expert Analysis
                </span>
                <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
                  Questions Our {division.name} Experts Answer
                </h2>
                <p className="text-lg text-slate-600">
                  Representative questions a {division.name.toLowerCase()} expert can address on standard of care and causation:
                </p>
              </div>
              <div className="space-y-4">
                {division.expertQuestions.map((q, i) => (
                  <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
                    <HelpCircle className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Daubert / Admissibility Considerations */}
        {division.daubert && division.daubert.length > 0 && (
          <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10">
                  <Scale className="h-6 w-6 text-electric" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                    Admissibility
                  </span>
                  <h2 className="text-display-md font-bold text-navy">
                    Daubert &amp; Admissibility Considerations
                  </h2>
                </div>
              </div>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                {division.daubert.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What to Expect When Retaining an Expert */}
        {division.whatToExpect && division.whatToExpect.length > 0 && (
          <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                  Engagement
                </span>
                <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
                  What to Expect When You Retain an Expert
                </h2>
                <p className="text-lg text-slate-600">
                  Our process is built for litigation timelines — from conflict check to trial testimony.
                </p>
              </div>
              <div className="space-y-6">
                {division.whatToExpect.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10">
                        <ClipboardCheck className="h-6 w-6 text-electric" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Reading */}
        {relatedPosts.length > 0 && (
          <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mb-12">
                <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                  Related Reading
                </span>
                <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
                  Insights for {division.name} Litigation
                </h2>
                <p className="text-lg text-slate-600">
                  Attorney-focused guides from our {division.name.toLowerCase()} and related practice areas.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group bg-clinical border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <h3 className="font-display font-bold text-base text-navy mb-2 leading-snug group-hover:text-electric transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{post.metaDescription}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-electric group-hover:gap-2 transition-all">
                      Read article <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
        <CaseReviewCTA
          subtext={`Contact our team to review your case and connect with the right ${division.name} expert witness. We run a conflict check and typically provide a CV and fee schedule within one business day.`}
        />

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
