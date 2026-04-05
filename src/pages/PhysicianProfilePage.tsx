import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  MapPin,
  Shield,
  CheckCircle,
  Phone,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
  Scale,
} from 'lucide-react';
import { physicians } from '@/data/physicians';

function availabilityColor(a: string) {
  if (a === 'available') return 'bg-emerald-100 text-emerald-700';
  if (a === 'limited') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
}

function availabilityLabel(a: string) {
  if (a === 'available') return 'Available Now';
  if (a === 'limited') return 'Limited Availability';
  return 'Unavailable';
}

export function PhysicianProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const physician = physicians.find((p) => p.slug === slug);

  if (!physician) {
    return (
      <>
        <Navigation />
        <main className="pt-24 pb-16 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">Expert Not Found</h1>
            <p className="text-muted-foreground mb-6">The physician profile you're looking for doesn't exist.</p>
            <Link to="/registry">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft size={16} className="mr-2" /> Back to Registry
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const initials = physician.name.split(' ').map((n) => n[0]).filter((c) => /[A-Z]/.test(c)).slice(0, 2).join('');

  return (
    <>
      <SEO
        title={`${physician.name} — Expert Witness`}
        description={`${physician.name} is a ${physician.credentials} providing expert witness services in ${physician.specialty}. ${physician.yearsExperience}+ years of experience.`}
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="relative w-full py-12 lg:py-20 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <Link
                to="/registry"
                className="inline-flex items-center gap-2 text-white/60 hover:text-electric transition-colors text-sm mb-8"
              >
                <ArrowLeft size={16} /> Back to Registry
              </Link>

              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-electric/20 flex items-center justify-center text-electric font-display font-bold text-2xl lg:text-3xl shrink-0">
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="display-heading text-display-sm text-white">
                      {physician.name}
                    </h1>
                    {physician.featured && (
                      <Badge className="bg-electric/20 text-electric border-0">Featured Expert</Badge>
                    )}
                  </div>
                  <p className="text-lg text-white/70 mb-4">{physician.credentials}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {physician.location.city}, {physician.location.state}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      {physician.yearsExperience}+ years
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText size={14} />
                      {physician.caseCount}+ cases
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${availabilityColor(physician.availability)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {availabilityLabel(physician.availability)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Bio */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{physician.bio}</p>
                </div>

                {/* Board Certifications */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap size={20} className="text-electric" />
                    Board Certifications
                  </h2>
                  <div className="space-y-3">
                    {physician.boardCertifications.map((cert) => (
                      <div key={cert} className="flex items-start gap-3 p-3 bg-clinical-100 rounded-xl">
                        <Shield size={16} className="text-teal mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subspecialties */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">Subspecialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {physician.subspecialties.map((sub) => (
                      <Badge key={sub} variant="secondary" className="text-sm py-1.5 px-3">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Case Types */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Scale size={20} className="text-electric" />
                    Case Types
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {physician.caseTypes.map((ct) => (
                      <Badge key={ct} className="bg-electric/10 text-electric border-0 text-sm py-1.5 px-3">
                        {ct}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* States Licensed */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-electric" />
                    States Licensed
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {physician.statesLicensed.map((st) => (
                      <span key={st} className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-clinical-100 text-sm font-medium text-foreground">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4">
                    Retain This Expert
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Submit a case inquiry to request availability, CV, and fee schedule for {physician.name.split(',')[0]}.
                  </p>
                  <Link to="/#contact">
                    <Button className="w-full bg-electric hover:bg-electric/90 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 mb-3">
                      <Phone size={16} />
                      Request a Consult
                    </Button>
                  </Link>
                  <a href="tel:9193077949">
                    <Button variant="outline" className="w-full py-3 rounded-full flex items-center justify-center gap-2">
                      <Phone size={16} />
                      (919) 307-7949
                    </Button>
                  </a>

                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle size={16} className="text-teal shrink-0" />
                      <span className="text-muted-foreground">CV available on request</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-teal shrink-0" />
                      <span className="text-muted-foreground">Response within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield size={16} className="text-teal shrink-0" />
                      <span className="text-muted-foreground">Conflict check included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
