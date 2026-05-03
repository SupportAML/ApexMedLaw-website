import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Send, Linkedin, Twitter, CheckCircle, AlertTriangle, Shield, FileCheck, Clock } from 'lucide-react';

const CONTACT_EMAIL = 'support@apexmedlaw.com';

const CASE_TYPES = [
  'Medical Malpractice',
  'Personal Injury',
  'IME (Independent Medical Examination)',
  'Criminal',
  'Workers\' Compensation',
  'Other',
];

const PHYSICIAN_SPECIALTIES = [
  'Neurology',
  'Neurosurgery',
  'Pediatric Neurology',
  'Internal Medicine',
  'Gastroenterology',
  'Critical Care',
  'Anesthesiology',
  'Radiology',
  'Physical Medicine and Rehabilitation',
  'Pharmacy',
  'Other',
];

const NEXT_STEPS = [
  { icon: FileCheck, text: 'We review your case details' },
  { icon: Clock, text: 'Match you with an expert within 24 hours' },
  { icon: Send, text: 'Provide CV, fee schedule, and availability' },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    lawFirm: '',
    email: '',
    phone: '',
    caseType: '',
    specialty: '',
    urgentDeadline: '' as '' | 'yes' | 'no',
    deadlineDetails: '',
    caseDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
          urgentDeadline: formData.urgentDeadline,
          deadlineDetails: formData.deadlineDetails,
          caseDetails: formData.caseDetails,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      setFormData({
        name: '', lawFirm: '', email: '', phone: '',
        caseType: '', specialty: '',
        urgentDeadline: '', deadlineDetails: '', caseDetails: '',
      });
    } catch {
      setSubmitError(`Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden z-[90]"
    >
      <div className="absolute inset-0 neural-bg opacity-[0.05]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-4">
                  Retain an Expert
                </span>
                <h2 className="display-heading text-display-lg text-white mb-4">
                  SUBMIT A
                  <br />
                  <span className="text-electric">CASE INQUIRY</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Tell us about your case, timeline, and specialty needs. We respond
                  within one business day with expert availability, CV, and fee schedule.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-white/90 font-semibold text-sm mb-4 uppercase tracking-wider">
                  What Happens Next
                </p>
                <div className="space-y-3">
                  {NEXT_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-electric/20 flex-shrink-0">
                          <Icon size={16} className="text-electric" />
                        </div>
                        <span className="text-white/70 text-sm">
                          <span className="text-white/40 font-mono text-xs mr-2">{i + 1}.</span>
                          {step.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-4 text-white/80 hover:text-electric transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-electric/20 flex items-center justify-center transition-colors">
                    <Mail size={22} className="text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <p className="font-medium text-lg">{CONTACT_EMAIL}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <MapPin size={22} className="text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Coverage</p>
                    <p className="font-medium">Available Nationwide</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
                >
                  <Linkedin size={22} className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
                >
                  <Twitter size={22} className="text-white" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-electric" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                      Inquiry Received
                    </h3>
                    <p className="text-text-secondary">
                      Thank you for reaching out. We'll respond within one business
                      day with expert availability, CV, and fee schedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
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
                        Law Firm or Organization *
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

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
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
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
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
                          onChange={handleSelectChange}
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
                          onChange={handleSelectChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                        >
                          <option value="">Select specialty...</option>
                          {PHYSICIAN_SPECIALTIES.map((specialty) => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Urgent Deadline — with amber glow when active */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Urgent Deadline? *
                      </label>
                      <div className="flex gap-3 mb-2">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, urgentDeadline: 'yes' }))}
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border transition-all ${
                            formData.urgentDeadline === 'yes'
                              ? 'bg-amber-50 text-amber-800 border-amber-400 shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                              : 'bg-white text-foreground border-border hover:border-electric/50'
                          }`}
                        >
                          <AlertTriangle size={16} className={formData.urgentDeadline === 'yes' ? 'text-amber-600' : 'text-text-secondary'} />
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, urgentDeadline: 'no', deadlineDetails: '' }))}
                          className={`px-5 py-3 rounded-xl text-sm font-medium border transition-all ${
                            formData.urgentDeadline === 'no'
                              ? 'bg-electric/10 text-electric border-electric'
                              : 'bg-white text-foreground border-border hover:border-electric/50'
                          }`}
                        >
                          No
                        </button>
                      </div>
                      {formData.urgentDeadline === 'yes' && (
                        <div className="mt-3">
                          <Textarea
                            name="deadlineDetails"
                            value={formData.deadlineDetails}
                            onChange={handleChange}
                            placeholder="e.g., Expert report due April 15, 2026; deposition scheduled May 1"
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric resize-none"
                          />
                          <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                            If you're facing a discovery cutoff, Daubert challenge deadline, or trial date,
                            let us know. We regularly accommodate expedited timelines for case review,
                            report delivery, and deposition preparation.
                          </p>
                        </div>
                      )}
                      <input
                        type="text"
                        required
                        value={formData.urgentDeadline}
                        onChange={() => {}}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Case Details *
                      </label>
                      <Textarea
                        name="caseDetails"
                        value={formData.caseDetails}
                        onChange={handleChange}
                        placeholder="Briefly describe the matter, the medical issues involved, and what you need from an expert (e.g., case merit review, IME, deposition, trial testimony)..."
                        required
                        rows={6}
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
                          Submit Case Inquiry
                          <Send size={18} />
                        </>
                      )}
                    </Button>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-6 pt-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <Shield size={14} className="text-teal" />
                        HIPAA Compliant
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-teal" />
                        Conflict Check
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield size={14} className="text-teal" />
                        Secure
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
