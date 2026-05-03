import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, GraduationCap, Award, MapPin } from 'lucide-react';
import { physicians, type Physician } from '@/data/physicians';

const leadershipTeam = physicians.filter((p) => p.featured);
const ancillaryTeam = physicians.filter((p) => !p.featured);

export function TeamSection() {
  const [selectedDoctor, setSelectedDoctor] = useState<Physician | null>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="team"
      className="relative w-full py-20 lg:py-28 team-legal-bg overflow-hidden z-30"
    >
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="display-heading text-display-lg text-foreground mb-4">
              MEET OUR BOARD-CERTIFIED PHYSICIANS
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our experts come from top institutions, hold leadership positions, and
              deliver rapid, reliable case reviews.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="mb-12">
            <h3 className="font-display font-bold text-xl text-foreground mb-6 text-center">
              LEADERSHIP
            </h3>
            <div
              className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
            >
              {leadershipTeam.map((doctor) => (
                <div
                  key={doctor.slug}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="group bg-clinical rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto overflow-hidden">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="sm:w-3/5 p-5 lg:p-6 flex flex-col justify-center">
                      <span className="text-xs font-semibold text-electric uppercase tracking-wider mb-1">
                        {doctor.title}
                      </span>
                      <h4 className="font-display font-bold text-lg text-foreground mb-1">
                        {doctor.name}
                      </h4>
                      <p className="text-sm text-text-secondary mb-3">{doctor.role}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doctor.credentials.slice(0, 2).map((cred, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full"
                          >
                            <Award size={12} className="text-electric" />
                            {cred}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedDoctor(doctor);
                        }}
                        className="relative z-10 mt-1 -ml-1 px-1 py-2 text-xs font-medium text-electric flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0 rounded focus:outline-none focus:ring-2 focus:ring-electric/50 focus:ring-offset-2"
                        aria-label={`View profile for ${doctor.name}`}
                      >
                        View Profile <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ancillary Team */}
          <div className="mb-12">
            <h3 className="font-display font-bold text-xl text-foreground mb-6 text-center">
              ANCILLARY PHYSICIAN PARTNERS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {ancillaryTeam.map((doctor) => (
                <div
                  key={doctor.slug}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="group bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-bold text-sm text-foreground mb-1 line-clamp-1">
                      {doctor.name}
                    </h4>
                    <p className="text-xs text-text-secondary mb-2">{doctor.role}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedDoctor(doctor);
                      }}
                      className="relative z-10 -ml-1 mt-1 px-1 py-2 text-xs font-medium text-electric flex items-center gap-1 cursor-pointer bg-transparent border-0 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-electric/50 focus:ring-offset-2"
                      aria-label={`View profile for ${doctor.name}`}
                    >
                      View Profile <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Request Full Team Credentials
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Doctor profile modal */}
      <Dialog
        open={!!selectedDoctor}
        onOpenChange={(open) => !open && setSelectedDoctor(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-[100]">
          <DialogHeader>
            <DialogTitle className="sr-only">Doctor Profile</DialogTitle>
          </DialogHeader>
          {selectedDoctor && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-electric uppercase tracking-wider">
                  {selectedDoctor.title}
                </span>
                <h3 className="font-display font-bold text-2xl text-foreground mt-1 mb-1">
                  {selectedDoctor.name}
                </h3>
                <p className="text-text-secondary mb-4">{selectedDoctor.role}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDoctor.credentials.map((cred, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-electric/10 text-electric px-3 py-1 rounded-full"
                    >
                      <GraduationCap size={12} />
                      {cred}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                  <MapPin size={14} />
                  {selectedDoctor.location}
                </div>

                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {selectedDoctor.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/experts/${selectedDoctor.slug}`} onClick={() => setSelectedDoctor(null)}>
                    <Button variant="outline" className="border-electric text-electric hover:bg-electric/10">
                      Full Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedDoctor(null);
                      scrollToContact();
                    }}
                    className="bg-electric hover:bg-electric/90 text-white"
                  >
                    Request Consultation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
