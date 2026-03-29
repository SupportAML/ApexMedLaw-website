import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Phone, Mail } from 'lucide-react';

const divisions = [
  { name: 'Neurology', slug: 'neurology' },
  { name: 'Critical Care', slug: 'critical-care' },
  { name: 'Gastroenterology', slug: 'gastroenterology' },
  { name: 'Pain Medicine', slug: 'pain-medicine' },
];

const quickLinks = [
  { name: 'Divisions', href: '/#divisions' },
  { name: 'Services', href: '/#services' },
  { name: 'Our Team', href: '/#team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl tracking-tight">
              Apex<span className="text-electric">MedLaw</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Physician-led medical-legal consulting. Board-certified experts delivering authoritative case reviews and testimony nationwide.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="tel:9193077949"
                className="flex items-center gap-2 text-white/70 hover:text-electric text-sm transition-colors"
              >
                <Phone size={14} />
                (919) 307-7949
              </a>
              <a
                href="mailto:support@apexmedlaw.com"
                className="flex items-center gap-2 text-white/70 hover:text-electric text-sm transition-colors"
              >
                <Mail size={14} />
                support@apexmedlaw.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              Divisions
            </h4>
            <ul className="space-y-2.5">
              {divisions.map((div) => (
                <li key={div.slug}>
                  <Link
                    to={`/divisions/${div.slug}`}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
              >
                <Linkedin size={16} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
              >
                <Twitter size={16} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2026 ApexMedLaw. All Rights Reserved.
          </p>
          <p className="text-white/30 text-xs">
            Medical-Legal Expert Witness Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
