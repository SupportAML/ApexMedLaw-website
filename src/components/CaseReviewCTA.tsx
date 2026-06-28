import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseReviewCTAProps {
  /** Override the default heading. */
  heading?: string;
  /** Override the default supporting copy. */
  subtext?: string;
  className?: string;
}

/**
 * Consistent, prominent "Request a Case Review" call-to-action used across
 * division, expert, and blog-post pages. Wired to the homepage contact/intake
 * section (`/#contact`), which posts to the existing `/api/contact` route. Uses a
 * react-router <Link> so it is SSR/prerender-safe (no window access at render).
 */
export function CaseReviewCTA({
  heading = 'Request a Case Review',
  subtext = 'Tell us about your case and we will run a conflict check and match you with the right board-certified physician expert — typically with a CV and fee schedule within one business day.',
  className = '',
}: CaseReviewCTAProps) {
  return (
    <section className={`relative w-full py-16 lg:py-20 px-6 lg:px-12 bg-navy text-white ${className}`}>
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-display-lg font-bold">{heading}</h2>
        <p className="text-lg text-slate-300">{subtext}</p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Link to="/#contact">
            <Button
              size="lg"
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              Request a Case Review
              <ArrowRight size={20} />
            </Button>
          </Link>
          <a href="tel:9193077949">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-full flex items-center gap-2"
            >
              <Phone size={18} />
              (919) 307-7949
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
