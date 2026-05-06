import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Phone, Mail } from 'lucide-react';
import { SPECIALTIES } from '@/data/physicians';

const divisions = SPECIALTIES.map((s) => ({ name: s.name, slug: s.slug }));

const quickLinks = [
  { name: 'Divisions', href: '/#divisions' },
  { name: 'Services', href: '/#services' },
  { name: 'Our Team', href: '/#team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" aria-label="ApexMedLaw home" className="inline-block">
              <img
                src="/logo.png"
                alt="ApexMedLaw"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Physician-led medical-legal consulting. Board-certified experts delivering authoritative case reviews and testimony nationwide.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="tel:9193077949"
                className="flex items-center gap-2 text-slate-600 hover:text-electric text-sm transition-colors"
              >
                <Phone size={14} />
                (919) 307-7949
              </a>
              <a
                href="mailto:support@apexmedlaw.com"
                className="flex items-center gap-2 text-slate-600 hover:text-electric text-sm transition-colors"
              >
                <Mail size={14} />
                support@apexmedlaw.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-electric text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5">
              {divisions.map((div) => (
                <li key={div.slug}>
                  <Link
                    to={`/divisions/${div.slug}`}
                    className="text-slate-600 hover:text-electric text-sm transition-colors"
                  >
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <a href="#" className="text-slate-600 hover:text-electric text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-electric text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-electric text-sm transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-electric hover:border-electric transition-colors group shadow-xs"
              >
                <Linkedin size={16} className="text-slate-600 group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-electric hover:border-electric transition-colors group shadow-xs"
              >
                <Twitter size={16} className="text-slate-600 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 ApexMedLaw. All Rights Reserved.
          </p>
          <p className="text-slate-400 text-xs">
            Medical-Legal Expert Witness Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
