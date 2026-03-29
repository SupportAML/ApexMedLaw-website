import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  image?: string;
}

const BASE_URL = 'https://www.apexmedlaw.com';
const DEFAULT_TITLE = 'ApexMedLaw | Physician-Led Medical-Legal Expert Witness Consulting';
const DEFAULT_DESCRIPTION = 'Board-certified, trial-ready physician expert witnesses for medical malpractice, personal injury, and IME cases. Neurology, Critical Care, GI, and Pain Medicine divisions. Nationwide coverage.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export function SEO({ title, description, path = '/', type = 'website', publishedTime, image }: SEOProps) {
  const pageTitle = title ? `${title} | ApexMedLaw` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ApexMedLaw" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

/** JSON-LD for ProfessionalService (homepage) */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ApexMedLaw',
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    telephone: '+19193077949',
    email: 'support@apexmedlaw.com',
    areaServed: 'US',
    serviceType: 'Medical-Legal Expert Witness Consulting',
    knowsAbout: [
      'Neurology Expert Witness',
      'Critical Care Expert Witness',
      'Gastroenterology Expert Witness',
      'Pain Medicine Expert Witness',
      'Medical Malpractice',
      'Independent Medical Examination',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/** JSON-LD for blog Article */
export function ArticleSchema({ title, description, date, slug }: { title: string; description: string; date: string; slug: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Organization',
      name: 'ApexMedLaw',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApexMedLaw',
      url: BASE_URL,
    },
    mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
