import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you requested could not be found on ApexMedLaw. Browse our divisions, expert witnesses, or blog instead."
        path="/404"
        noindex
      />
      <Navigation />
      <main className="pt-24 pb-20 min-h-screen bg-clinical">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric mb-3">
            404 — Page Not Found
          </p>
          <h1 className="font-display text-display-md text-foreground mb-4">
            We can't find that page.
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            The page you requested may have moved or never existed. Use the links below to find
            what you're looking for, or contact us directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button className="bg-electric hover:bg-electric/90 text-white rounded-full px-6 py-5 inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Home
              </Button>
            </Link>
            <Link to="/experts">
              <Button variant="outline" className="rounded-full px-6 py-5">
                Browse Our Experts
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="rounded-full px-6 py-5">
                Read the Blog
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
