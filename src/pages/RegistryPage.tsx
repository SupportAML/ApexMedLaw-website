import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Shield,
  MapPin,
} from 'lucide-react';

const founders = [
  {
    name: 'Abhi Kapuria, MD',
    role: 'Founder & CEO',
    specialty: 'Board-Certified Neurologist',
    location: 'Raleigh, NC',
    certifications: ['American Board of Psychiatry and Neurology — Neurology'],
    areas: ['TBI', 'Stroke', 'Seizure Disorders', 'Neuromuscular Disease'],
  },
  {
    name: 'Ovais Inamullah, MD',
    role: 'Co-Founder & CMO',
    specialty: 'Board-Certified in Critical Care & Internal Medicine',
    location: 'Dallas, TX',
    certifications: ['ABIM — Critical Care Medicine', 'ABIM — Internal Medicine'],
    areas: ['Ventilator Management', 'Sepsis Protocols', 'ICU Standard of Care', 'Wrongful Death'],
  },
];

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
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                Our Leadership
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                Board-Certified <span className="text-electric">Medical Experts</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                ApexMedLaw is led by physicians who combine deep clinical expertise with
                medical-legal experience. Contact us to discuss your case.
              </p>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {founders.map((doc) => (
                <div
                  key={doc.name}
                  className="bg-white rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center text-electric font-display font-bold text-lg">
                      {doc.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">{doc.name}</h3>
                      <p className="text-sm text-electric font-medium">{doc.role}</p>
                      <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin size={14} />
                    {doc.location}
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {doc.certifications.map((cert) => (
                      <span key={cert} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield size={10} className="text-teal shrink-0" />
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {doc.areas.map((area) => (
                      <span key={area} className="text-xs bg-clinical-100 text-muted-foreground px-2 py-1 rounded-md">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="w-full px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 neural-bg opacity-[0.05]" />
              <div className="relative z-10">
                <h2 className="display-heading text-display-sm text-white mb-4">
                  Have a Case? Let's Talk.
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Whether you need a neurology, critical care, gastroenterology, or pain medicine expert witness,
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
