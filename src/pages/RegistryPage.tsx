import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Shield,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import { physicians, type Physician } from '@/data/physicians';

function availabilityColor(a: Physician['availability']) {
  if (a === 'available') return 'bg-emerald-100 text-emerald-700';
  if (a === 'limited') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
}

function availabilityLabel(a: Physician['availability']) {
  if (a === 'available') return 'Available';
  if (a === 'limited') return 'Limited';
  return 'Unavailable';
}

function FounderCard({ physician }: { physician: Physician }) {
  return (
    <Link
      to={`/registry/${physician.slug}`}
      className="group bg-white rounded-2xl border border-border hover:border-electric/30 hover:shadow-card transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center text-electric font-display font-bold text-lg">
              {physician.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground group-hover:text-electric transition-colors">
                {physician.name}
              </h3>
              <p className="text-sm text-muted-foreground">{physician.specialty}</p>
            </div>
          </div>
          <Badge className="bg-electric/10 text-electric border-0 text-xs">Founder</Badge>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {physician.boardCertifications.slice(0, 2).map((cert) => (
            <span key={cert} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-clinical-100 px-2 py-1 rounded-md">
              <Shield size={10} className="text-teal" />
              {cert.length > 45 ? cert.slice(0, 42) + '...' : cert}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} />
            {physician.location.city}, {physician.location.state}
          </div>
          <div className="text-muted-foreground">
            {physician.yearsExperience}+ years experience
          </div>
          <div className="text-muted-foreground">
            {physician.caseCount}+ cases reviewed
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${availabilityColor(physician.availability)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {availabilityLabel(physician.availability)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {physician.subspecialties.slice(0, 3).map((sub) => (
            <Badge key={sub} variant="secondary" className="text-xs font-normal">
              {sub}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm font-medium text-electric group-hover:gap-2 transition-all">
          View full profile <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}

export function RegistryPage() {
  return (
    <>
      <SEO
        title="Our Expert Witnesses"
        description="ApexMedLaw's founding physician expert witnesses. Board-certified specialists in neurology, critical care, and more. Contact us to discuss your case."
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                Our Expert Witnesses
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                Board-Certified <span className="text-electric">Medical Experts</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                ApexMedLaw's founding physicians bring deep clinical expertise to every case.
                Contact us to discuss how we can support your litigation needs.
              </p>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {physicians.map((p) => (
                <FounderCard key={p.id} physician={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="w-full px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="bg-navy rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 neural-bg opacity-[0.05]" />
              <div className="relative z-10">
                <h2 className="display-heading text-display-sm text-white mb-4">
                  Have a Case? Let's Talk.
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Whether you need a neurology, critical care, or other medical expert witness,
                  our team will match you with the right physician for your case. Response within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/#contact">
                    <Button className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-3 rounded-full flex items-center gap-2">
                      <Mail size={18} />
                      Submit a Case Inquiry
                    </Button>
                  </a>
                  <a href="tel:9193077949">
                    <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 font-medium px-8 py-3 rounded-full flex items-center gap-2">
                      <Phone size={18} />
                      (919) 307-7949
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
