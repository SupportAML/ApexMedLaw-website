import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  UserPlus,
  CheckCircle,
  Shield,
  DollarSign,
  Users,
  Zap,
  Send,
  ArrowRight,
} from 'lucide-react';
import { SPECIALTIES, US_STATES } from '@/data/physicians';

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Free Forever',
    description: 'No annual fees, no listing charges. Unlike SEAK ($575–$1,150/year), our registry is completely free for physicians.',
  },
  {
    icon: Users,
    title: 'Direct Attorney Access',
    description: 'Get matched with law firms actively searching for your specialty. We handle the marketing so you can focus on casework.',
  },
  {
    icon: Zap,
    title: 'Fast Onboarding',
    description: 'Apply in 5 minutes. Our team reviews applications within 48 hours and gets your profile live quickly.',
  },
  {
    icon: Shield,
    title: 'Quality Network',
    description: 'All physicians are vetted for board certification and active clinical practice. Your profile appears alongside credible peers.',
  },
];

const EXPERIENCE_LEVELS = [
  'No prior expert witness experience',
  '1–5 cases',
  '6–20 cases',
  '21–50 cases',
  '50+ cases',
];

const AVAILABILITY_OPTIONS = [
  'Available — accepting new cases',
  'Limited — selective case acceptance',
  'Not currently accepting cases',
];

export function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    subspecialties: '',
    boardCertifications: '',
    yearsExperience: '',
    caseExperience: '',
    statesLicensed: [] as string[],
    availability: '',
    feeRange: '',
    bio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleState = (st: string) => {
    setFormData((prev) => ({
      ...prev,
      statesLicensed: prev.statesLicensed.includes(st)
        ? prev.statesLicensed.filter((s) => s !== st)
        : [...prev.statesLicensed, st],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          statesLicensed: formData.statesLicensed.join(', '),
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please email us directly at support@apexmedlaw.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none';
  const selectArrow = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'right 12px center',
  };

  return (
    <>
      <SEO
        title="Join Our Expert Witness Network"
        description="Apply to join the ApexMedLaw physician expert witness registry. Free for physicians. No annual fees. Get matched with attorneys who need your specialty."
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                For Physicians
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                Join Our Expert <span className="text-electric">Witness Network</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                List your profile for free. Get matched with attorneys seeking your specialty.
                No annual fees — ever.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full px-6 lg:px-12 -mt-8 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="bg-white rounded-2xl border border-border p-5 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-electric" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-white rounded-3xl shadow-card p-8 lg:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-electric" />
                </div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                  Application Received
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Thank you for applying to the ApexMedLaw expert witness network.
                  Our team will review your application and respond within 48 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  Questions? Email us at{' '}
                  <a href="mailto:support@apexmedlaw.com" className="text-electric hover:underline">
                    support@apexmedlaw.com
                  </a>
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-card p-6 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center">
                    <UserPlus size={22} className="text-electric" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Physician Application
                    </h2>
                    <p className="text-sm text-muted-foreground">Takes about 5 minutes</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-electric text-white text-xs flex items-center justify-center">1</span>
                      Personal Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                        <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <Input name="lastName" value={formData.lastName} onChange={handleChange} required className="rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                        <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="rounded-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-electric text-white text-xs flex items-center justify-center">2</span>
                      Professional Background
                    </h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Primary Specialty *</label>
                          <select name="specialty" value={formData.specialty} onChange={handleSelectChange} required className={selectClass} style={selectArrow}>
                            <option value="">Select specialty...</option>
                            {SPECIALTIES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Years of Experience *</label>
                          <Input name="yearsExperience" type="number" min="0" value={formData.yearsExperience} onChange={handleChange} required className="rounded-xl" placeholder="e.g., 12" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Subspecialties</label>
                        <Input name="subspecialties" value={formData.subspecialties} onChange={handleChange} className="rounded-xl" placeholder="e.g., Clinical Neurophysiology, Headache Medicine" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Board Certifications *</label>
                        <Textarea name="boardCertifications" value={formData.boardCertifications} onChange={handleChange} required rows={2} className="rounded-xl resize-none" placeholder="e.g., American Board of Psychiatry and Neurology — Neurology" />
                      </div>
                    </div>
                  </div>

                  {/* Expert Witness Experience */}
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-electric text-white text-xs flex items-center justify-center">3</span>
                      Expert Witness Experience
                    </h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Case Experience</label>
                          <select name="caseExperience" value={formData.caseExperience} onChange={handleSelectChange} className={selectClass} style={selectArrow}>
                            <option value="">Select experience level...</option>
                            {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Availability *</label>
                          <select name="availability" value={formData.availability} onChange={handleSelectChange} required className={selectClass} style={selectArrow}>
                            <option value="">Select availability...</option>
                            {AVAILABILITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Fee Range (optional)</label>
                        <Input name="feeRange" value={formData.feeRange} onChange={handleChange} className="rounded-xl" placeholder="e.g., $400–$600/hr for record review, $500–$800/hr for testimony" />
                      </div>
                    </div>
                  </div>

                  {/* States Licensed */}
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-electric text-white text-xs flex items-center justify-center">4</span>
                      States Licensed
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">Select all states where you hold an active medical license.</p>
                    <div className="flex flex-wrap gap-1.5">
                      {US_STATES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => toggleState(st)}
                          className={`w-11 h-9 rounded-lg text-xs font-medium border transition-colors ${
                            formData.statesLicensed.includes(st)
                              ? 'bg-electric text-white border-electric'
                              : 'bg-white text-foreground border-border hover:border-electric/30'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                    {formData.statesLicensed.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {formData.statesLicensed.length} state{formData.statesLicensed.length !== 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-electric text-white text-xs flex items-center justify-center">5</span>
                      Professional Bio
                    </h3>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="rounded-xl resize-none"
                      placeholder="Brief summary of your clinical practice, areas of expertise, and what makes you well-suited for expert witness work..."
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Shield size={14} className="text-teal" />
                      HIPAA Compliant
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-teal" />
                      Reviewed in 48 hours
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Send size={14} className="text-teal" />
                      Free forever
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
