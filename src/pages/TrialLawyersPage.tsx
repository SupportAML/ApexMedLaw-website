import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEO } from '@/components/SEO';
import {
  ArrowRight,
  Phone,
  GraduationCap,
  Gavel,
  MessageSquareQuote,
  FileCheck,
  Clock,
  ShieldCheck,
  Stethoscope,
  Network,
  Send,
  CheckCircle,
} from 'lucide-react';

const CONTACT_EMAIL = 'support@apexmedlaw.com';

/** Specialties surfaced in the print/AAJ creative (Part 3 of the campaign spec). */
const SPECIALTIES = [
  'Internal Medicine',
  'Gastroenterology',
  'Critical Care',
  'Spine',
  'Emergency Medicine',
  'Neurology',
  'Neurosurgery',
];

const CASE_TYPES = ['Personal Injury', 'Medical Malpractice', 'Other'];

/** Specialty options for the case-review form. */
const SPECIALTY_OPTIONS = [
  'Internal Medicine',
  'Gastroenterology',
  'Critical Care',
  'Spine Surgery',
  'Emergency Medicine',
  'Neurology',
  'Neurosurgery',
  'Orthopedic Surgery',
  'Physical Medicine and Rehabilitation',
  'Radiology',
  'Other',
];

const VALUE_PROPS = [
  {
    icon: GraduationCap,
    title: 'Elite Training, Real Credibility',
    body: 'Board-certified and fellowship-trained physicians from the nation’s top universities and hospitals. Credentials that withstand cross-examination.',
  },
  {
    icon: Gavel,
    title: 'Trial & Deposition Tested',
    body: 'Our experts have genuine medical-legal experience — they’ve testified, been deposed, and held up. Persuasive on the stand, not just on paper.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Clear, Articulate Testimony',
    body: 'We select physicians who can teach a jury. Complex medicine explained simply, credibly, and without overstatement.',
  },
  {
    icon: FileCheck,
    title: 'Excellent Work Product',
    body: 'Thorough, well-reasoned reports and chart reviews you can build a case around — and that opposing counsel can’t easily pick apart.',
  },
  {
    icon: Clock,
    title: 'Rapid Turnaround',
    body: 'Deadlines are real. We move quickly to match you with the right expert and get your review underway.',
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'Board-Certified' },
  { icon: GraduationCap, label: 'Fellowship-Trained' },
  { icon: Stethoscope, label: 'Top-Hospital Pedigree' },
  { icon: Gavel, label: 'Trial & Deposition Experience' },
  { icon: Network, label: 'Multi-Specialty Network' },
  { icon: Clock, label: 'Fast Turnaround' },
];

export function TrialLawyersPage() {
  // Attribution: default to "trial-lawyers", but honor utm_source / utm_campaign
  // from the printed/redirected URL when present. Read on the client only so the
  // prerendered HTML stays clean (no window access during SSR).
  const [source, setSource] = useState('trial-lawyers');

  const [formData, setFormData] = useState({
    name: '',
    lawFirm: '',
    email: '',
    phone: '',
    caseType: '',
    specialty: '',
    caseDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');
      const utmCampaign = params.get('utm_campaign');
      if (utmSource || utmCampaign) {
        setSource(
          [utmSource || 'trial-lawyers', utmCampaign].filter(Boolean).join(' / ')
        );
      }
    } catch {
      /* no-op: keep the default source */
    }
  }, []);

  const scrollToForm = () => {
    document.querySelector('#case-review')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          lawFirm: formData.lawFirm,
          email: formData.email,
          phone: formData.phone,
          caseType: formData.caseType,
          specialty: formData.specialty,
          urgentDeadline: 'no',
          deadlineDetails: '',
          caseDetails: formData.caseDetails,
          source,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      setFormData({
        name: '', lawFirm: '', email: '', phone: '',
        caseType: '', specialty: '', caseDetails: '',
      });
    } catch {
      setSubmitError(`Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Physician Expert Witnesses for Trial Lawyers"
        description="Board-certified, fellowship-trained physician expert witnesses for plaintiff PI and medical-malpractice attorneys. Trial-tested, credible testimony, rapid turnaround. Request a free case review."
        path="/trial-lawyers"
      />

      {/* Minimal, distraction-light header: logo + single primary CTA */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" aria-label="ApexMedLaw home" className="flex items-center shrink-0">
              <img src="/logo.png" alt="ApexMedLaw" className="h-12 lg:h-14 w-auto object-contain" />
            </Link>
            <Button
              onClick={scrollToForm}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-4 py-2 sm:px-6 text-xs sm:text-sm rounded-full transition-transform hover:-translate-y-0.5"
            >
              Request a Free Case Review
            </Button>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* HERO */}
        <section className="relative w-full hero-canvas-bg overflow-hidden z-10 pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center space-y-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 text-white rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                For Plaintiff PI & Medical-Malpractice Attorneys
              </span>

              <h1 className="display-heading text-display-xl text-white">
                Board-Certified Physician
                <span className="text-electric"> Expert Witnesses</span>
                <br />
                Matched to Your Case
              </h1>

              <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                ApexMedLaw connects plaintiff PI and medical-malpractice attorneys with
                fellowship-trained physicians who have real trial and deposition experience
                and deliver clear, credible testimony — fast.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center pt-2">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                >
                  Request a Free Case Review
                  <ArrowRight size={20} />
                </Button>
                <a href="#specialties">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-full flex items-center gap-2"
                  >
                    Browse Specialties
                    <ArrowRight size={20} />
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href="tel:9193077949"
                  className="flex items-center gap-2 text-white hover:text-electric transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center">
                    <Phone size={18} className="text-electric" />
                  </div>
                  <span className="font-medium">(919) 307-7949</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14 mx-auto text-center">
              <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                Why ApexMedLaw
              </span>
              <h2 className="text-display-lg font-bold text-navy mt-3">
                The Expert Your Case Deserves
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {VALUE_PROPS.map((prop) => {
                const Icon = prop.icon;
                return (
                  <div
                    key={prop.title}
                    className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-electric/10 mb-5">
                      <Icon className="h-6 w-6 text-electric" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">{prop.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{prop.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SPECIALTIES */}
        <section id="specialties" className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-semibold text-electric uppercase tracking-widest">
              Specialties
            </span>
            <h2 className="text-display-lg font-bold text-navy mt-3 mb-4">
              One Platform, Every Specialty
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Coverage across a growing network of specialties — and if we don’t have
              it in-network, we’ll source it.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {SPECIALTIES.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-clinical border border-slate-200 text-navy font-medium text-sm"
                >
                  {s}
                </span>
              ))}
              <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-electric/10 border border-electric/20 text-electric font-medium text-sm">
                …and more — ask about your specialty
              </span>
            </div>
          </div>
        </section>

        {/* CREDIBILITY / TRUST */}
        <section className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-navy text-white overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.06]" aria-hidden />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="text-sm font-semibold text-electric uppercase tracking-widest">
              Physician-Led
            </span>
            <h2 className="text-display-lg font-bold mt-3 mb-6">
              Built by Physicians, for Plaintiff Attorneys
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              ApexMedLaw is led by practicing physicians (CEO Abhi Kapuria, MD; CMO Ovais
              Inamullah, MD) who understand both the medicine and what wins in the courtroom.
              Every expert in our network is vetted for credentials, communication, and
              litigation readiness — so you get an expert who is credible on the chart and
              compelling on the stand.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
              {TRUST_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.label}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-electric/20 flex-shrink-0">
                      <Icon size={18} className="text-electric" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{point.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE-REVIEW CTA (contact form) */}
        <section id="case-review" className="relative w-full py-20 lg:py-24 px-6 lg:px-12 bg-clinical">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-electric uppercase tracking-widest">
                Free Case Review
              </span>
              <h2 className="text-display-lg font-bold text-navy mt-3 mb-3">
                Tell Us About Your Case. We’ll Find Your Expert.
              </h2>
              <p className="text-lg text-slate-600">
                No obligation. Confidential. Typical response within one business day.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-electric" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                    Case Review Requested
                  </h3>
                  <p className="text-text-secondary max-w-md">
                    Thank you for reaching out. We’ll review your case and respond within
                    one business day with expert availability, CV, and fee schedule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Hidden attribution field — also sent in the JSON payload above */}
                  <input type="hidden" name="source" value={source} />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Law Firm *
                      </label>
                      <Input
                        name="lawFirm"
                        value={formData.lawFirm}
                        onChange={handleChange}
                        placeholder="Smith & Associates LLP"
                        required
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@lawfirm.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Case Type
                      </label>
                      <select
                        name="caseType"
                        value={formData.caseType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                      >
                        <option value="">Select case type...</option>
                        {CASE_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Specialty Needed
                      </label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                      >
                        <option value="">Select specialty...</option>
                        {SPECIALTY_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Brief Case Summary *
                    </label>
                    <Textarea
                      name="caseDetails"
                      value={formData.caseDetails}
                      onChange={handleChange}
                      placeholder="Briefly describe the matter, the medical issues involved, and what you need from an expert (case merit review, IME, deposition, trial testimony)..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-electric hover:bg-electric/90 text-white font-medium py-4 rounded-full transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Request My Free Case Review
                        <Send size={18} />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-text-secondary">
                    No obligation. Confidential. Typical response within one business day.
                  </p>
                  <p className="text-center text-sm text-text-secondary">
                    Prefer to talk? Email{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:underline">
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or call{' '}
                    <a href="tel:9193077949" className="text-electric hover:underline">
                      (919) 307-7949
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
