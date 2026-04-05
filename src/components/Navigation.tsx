import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navLinks = [
  { label: 'Divisions', href: '#divisions' },
  { label: 'Services', href: '#services' },
  { label: 'Registry', href: '/registry', isRoute: true },
  { label: 'Team', href: '#team' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollTop / docHeight, 1));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const element = document.querySelector(href);
    if (!element) return;

    const allTriggers = ScrollTrigger.getAll();
    const snapTriggers = allTriggers.filter(st => st.vars.snap);
    snapTriggers.forEach(st => st.kill());

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: elementPosition, offsetY: 80 },
      ease: 'power2.inOut',
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-electric transition-none z-10"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-display font-bold text-lg lg:text-xl text-foreground tracking-tight"
            >
              Apex<span className="text-electric">Med</span>Law
            </Link>

            {/* Navigation links + CTA */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0 flex-1 justify-end">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 flex-wrap justify-end">
                {navLinks.map((link) =>
                  'isRoute' in link && link.isRoute ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-xs sm:text-sm font-medium text-foreground/80 hover:text-electric transition-colors relative group whitespace-nowrap"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      className="text-xs sm:text-sm font-medium text-foreground/80 hover:text-electric transition-colors relative group whitespace-nowrap"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full" />
                    </button>
                  )
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="tel:9193077949"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-electric transition-colors"
              >
                <Phone size={16} />
                (919) 307-7949
              </a>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-electric hover:bg-electric/90 text-white font-medium px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm rounded-full transition-transform hover:-translate-y-0.5"
              >
                Request a consult
              </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
