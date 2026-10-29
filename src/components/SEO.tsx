import { Helmet } from 'react-helmet-async';
import { BASE_URL, LOGO_IMAGE, OG_IMAGE, buildBlogPostingSchema } from '@/lib/seo-schema';
import type { BlogPostingSchemaInput } from '@/lib/seo-schema';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  image?: string;
}

const DEFAULT_TITLE = 'ApexMedLaw | Physician-Led Medical-Legal Expert Witness Consulting';
const DEFAULT_DESCRIPTION = 'Board-certified, trial-ready physician expert witnesses for medical malpractice, personal injury, and IME cases. Neurology, Critical Care, GI, and Pain Medicine divisions. Nationwide coverage.';
const DEFAULT_IMAGE = OG_IMAGE;

// Google shows ~60 characters of a title and ~155-160 of a description.
const TITLE_SUFFIX = ' | ApexMedLaw';
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;

/** Adds the brand suffix only when the full title still fits in the SERP. */
function formatTitle(title: string): string {
  return title.length + TITLE_SUFFIX.length <= MAX_TITLE ? `${title}${TITLE_SUFFIX}` : title;
}

/** Trims to the SERP limit on a word boundary instead of letting Google cut mid-word. */
function clampDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}

export function SEO({ title, description, path = '/', type = 'website', publishedTime, image }: SEOProps) {
  const pageTitle = title ? formatTitle(title) : DEFAULT_TITLE;
  const pageDescription = clampDescription(description || DEFAULT_DESCRIPTION);
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
      {ogImage === DEFAULT_IMAGE && <meta property="og:image:width" content="1200" />}
      {ogImage === DEFAULT_IMAGE && <meta property="og:image:height" content="630" />}
      <meta property="og:locale" content="en_US" />
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
    logo: LOGO_IMAGE,
    image: OG_IMAGE,
    areaServed: 'US',
    serviceType: 'Medical-Legal Expert Witness Consulting',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+19193077949',
      email: 'support@apexmedlaw.com',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
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

/** JSON-LD for a blog post (BlogPosting). */
export function BlogPostingSchema(props: BlogPostingSchemaInput) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(buildBlogPostingSchema(props))}</script>
    </Helmet>
  );
}
