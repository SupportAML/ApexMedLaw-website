import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { SPECIALTIES, getPhysiciansBySpecialty } from '@/data/physicians';

export function RegistryPage() {
  const specialtiesWithExperts = SPECIALTIES.map((s) => ({
    ...s,
    physicians: getPhysiciansBySpecialty(s.slug),
  }));

  return (
    <>
      <SEO
        title="Our Expert Witnesses"
        description="ApexMedLaw's network of board-certified physician expert witnesses. Browse by specialty: Neurology, Neurosurgery, Pediatric Neurology, Internal Medicine, Gastroenterology, Critical Care, Pain Medicine, Radiology, and Physical Medicine and Rehabilitation."
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                Our Expert Network
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                Board-Certified <span className="text-electric">Medical Experts</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                ApexMedLaw provides expert witnesses across nine medical specialties. Browse our network by specialty below.
              </p>
            </div>
          </div>
        </section>

        {/* Specialty quick-links */}
        <section className="w-full px-6 lg:px-12 py-10 bg-clinical">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {specialtiesWithExperts.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-electric hover:text-electric text-sm font-medium px-4 py-2 rounded-full transition-colors"
                >
                  {s.name}
                  <span className="text-xs text-slate-400">{s.physicians.length}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Specialty sections */}
        {specialtiesWithExperts.map((specialty) => (
          <section
            key={specialty.slug}
            id={specialty.slug}
            className="w-full px-6 lg:px-12 py-12 lg:py-16 even:bg-clinical scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-1">
                    {specialty.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {specialty.physicians.length} expert{specialty.physicians.length === 1 ? '' : 's'} available
                  </p>
                </div>
                <Link
                  to={`/divisions/${specialty.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:underline"
                >
                  View {specialty.name} division <ArrowRight size={14} />
                </Link>
              </div>

              {specialty.physicians.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Our network for {specialty.name} is expanding. Contact us to discuss your case.
                  </p>
                  <Link to="/#contact">
                    <Button variant="outline" className="rounded-full">
                      Request a Specialist
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {specialty.physicians.map((doc) => (
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
                        <h3 className="font-display font-bold text-sm text-foreground mb-1 line-clamp-2">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{doc.role}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-electric group-hover:gap-2 transition-all">
                          View Profile <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Contact CTA */}
        <section className="w-full px-6 lg:px-12 py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 neural-bg opacity-[0.05]" />
              <div className="relative z-10">
                <h2 className="display-heading text-display-sm text-white mb-4">
                  Have a Case? Let's Talk.
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Whether you need a neurology, neurosurgery, pediatric neurology, internal medicine, gastroenterology, critical care, pain medicine, radiology, or PM&R expert witness,
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
