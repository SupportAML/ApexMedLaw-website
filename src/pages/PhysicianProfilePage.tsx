import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Shield,
  CheckCircle,
  Phone,
  Clock,
  Mail,
} from 'lucide-react';
import { getPhysicianBySlug, getSpecialtyName } from '@/data/physicians';

export function PhysicianProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const physician = slug ? getPhysicianBySlug(slug) : undefined;

  if (!physician) {
    return (
      <>
        <Navigation />
        <main className="pt-24 pb-16 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">Expert Not Found</h1>
            <p className="text-muted-foreground mb-6">The physician profile you're looking for doesn't exist.</p>
            <Link to="/experts">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft size={16} className="mr-2" /> Back to Experts
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${physician.name} — Expert Witness`}
        description={`${physician.name} is a ${physician.role} providing expert witness services with ApexMedLaw.`}
        path={`/experts/${physician.slug}`}
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="relative w-full py-12 lg:py-20 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <Link
                to="/experts"
                className="inline-flex items-center gap-2 text-white/60 hover:text-electric transition-colors text-sm mb-8"
              >
                <ArrowLeft size={16} /> Back to Experts
              </Link>

              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                <div className="w-32 h-40 lg:w-44 lg:h-56 rounded-2xl overflow-hidden shrink-0 bg-electric/10">
                  <img
                    src={physician.photo}
                    alt={physician.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="display-heading text-display-sm text-white">
                      {physician.name}
                    </h1>
                    {physician.featured && (
                      <Badge className="bg-electric/20 text-electric border-0">{physician.title}</Badge>
                    )}
                  </div>
                  <p className="text-lg text-white/70 mb-4">{physician.role}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {physician.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {physician.categories.map((cat) => {
                      const name = getSpecialtyName(cat);
                      if (!name) return null;
                      return (
                        <Link
                          key={cat}
                          to={`/divisions/${cat}`}
                          className="inline-flex items-center gap-1 text-xs bg-electric/15 text-electric hover:bg-electric/25 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {name}
                        </Link>
                      );
                    })}
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
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{physician.bio}</p>
                </div>

                {/* Credentials */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">
                    Training & Credentials
                  </h2>
                  <div className="space-y-3">
                    {physician.credentials.map((cred) => (
                      <div key={cred} className="flex items-start gap-3 p-3 bg-clinical-100 rounded-xl">
                        <Shield size={16} className="text-teal mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">Specialties Covered</h2>
                  <div className="flex flex-wrap gap-2">
                    {physician.categories.map((cat) => {
                      const name = getSpecialtyName(cat);
                      if (!name) return null;
                      return (
                        <Link key={cat} to={`/divisions/${cat}`}>
                          <Badge variant="secondary" className="text-sm py-1.5 px-3 hover:bg-secondary/80 cursor-pointer">
                            {name} <ArrowRight size={12} className="ml-1" />
                          </Badge>
                        </Link>
                      );
                    })}
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
                      <Mail size={16} />
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
