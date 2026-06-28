import { Helmet } from 'react-helmet-async';
import { BASE_URL, buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo-schema';
import type { FAQItem, BreadcrumbItem } from '@/lib/seo-schema';

export type { FAQItem, BreadcrumbItem };

/** JSON-LD FAQPage. Renders nothing when there are no FAQs. */
export function FAQSchema({ faqs }: { faqs?: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(buildFaqSchema(faqs))}</script>
    </Helmet>
  );
}

/** JSON-LD BreadcrumbList. */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(items))}</script>
    </Helmet>
  );
}

/** JSON-LD for a division page (MedicalSpecialty + Service). */
export function DivisionSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} Expert Witness Services`,
    description,
    url: `${BASE_URL}/divisions/${slug}`,
    serviceType: `${name} Medical-Legal Expert Witness Consulting`,
    areaServed: 'US',
    provider: {
      '@type': 'ProfessionalService',
      name: 'ApexMedLaw',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/** JSON-LD for a physician profile page (Physician). */
export function PhysicianSchema({
  name,
  role,
  bio,
  location,
  credentials,
  slug,
}: {
  name: string;
  role: string;
  bio: string;
  location: string;
  credentials: string[];
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name,
    jobTitle: role,
    description: (() => {
      const clean = bio.replace(/\s+/g, ' ').trim();
      if (clean.length <= 300) return clean;
      const cut = clean.slice(0, 300);
      return cut.slice(0, cut.lastIndexOf(' ')) + '…';
    })(),
    url: `${BASE_URL}/experts/${slug}`,
    areaServed: location,
    hasCredential: credentials,
    affiliation: {
      '@type': 'Organization',
      name: 'ApexMedLaw',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
