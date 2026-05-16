import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.apexmedlaw.com';
const DEFAULT_TITLE = 'ApexMedLaw | Physician-Led Medical-Legal Expert Witness Consulting';
const DEFAULT_DESCRIPTION =
  'Board-certified physician expert witnesses for medical malpractice, personal injury, and IME cases. Duke-trained leadership. Nationwide.';
const SITE_NAME = 'ApexMedLaw';
const ORG_LOGO = `${BASE_URL}/logo.png`;
const ORG_PHONE = '+19193077949';
const ORG_EMAIL = 'support@apexmedlaw.com';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  /** When true, emits robots noindex,nofollow (non-prod or 404 pages). */
  noindex?: boolean;
  /** Suppress the auto-appended " | ApexMedLaw" suffix (homepage, etc.). */
  noTitleSuffix?: boolean;
}

function ogImageUrl(title: string): string {
  // Vercel serverless OG image endpoint at /api/og?title=...
  // Defined in api/og.ts. Falls back to the static og-image.jpg if the
  // serverless function isn't deployed.
  return `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`;
}

export function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  image,
  noindex = false,
  noTitleSuffix = false,
}: SEOProps) {
  const pageTitle = title
    ? noTitleSuffix
      ? title
      : `${title} | ApexMedLaw`
    : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${path === '/' ? '' : path}` || BASE_URL;
  const ogImage = image || ogImageUrl(title ?? SITE_NAME);

  // Build effective noindex: prop OR env (non-prod). Env is read at build
  // time by Vite so it's baked into the SSR output.
  const envNoindex = (import.meta.env.VITE_PUBLIC_NOINDEX ?? '').toString() === 'true';
  const robotsNoindex = noindex || envNoindex;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />
      {robotsNoindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Structured-data helpers                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Helmet>
      <script type="application/ld+json" data-jsonld-id={id}>
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

/**
 * Organization + ProfessionalService + LocalBusiness graph for the homepage.
 * Co-located in a single @graph so all three reference the same `@id`.
 */
export function HomepageSchema() {
  const orgId = `${BASE_URL}/#organization`;
  const placeId = `${BASE_URL}/#localbusiness`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: ORG_LOGO,
        },
        sameAs: [
          'https://www.linkedin.com/company/apexmedlaw',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: ORG_PHONE,
            email: ORG_EMAIL,
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': placeId,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: BASE_URL,
        image: ORG_LOGO,
        telephone: ORG_PHONE,
        email: ORG_EMAIL,
        priceRange: '$$$',
        parentOrganization: { '@id': orgId },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressRegion: 'NC',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: 'Medical-Legal Expert Witness Consulting',
        knowsAbout: [
          'Medical Malpractice',
          'Personal Injury',
          'Independent Medical Examination',
          'Expert Witness Testimony',
          'Neurology Expert Witness',
          'Critical Care Expert Witness',
          'Gastroenterology Expert Witness',
          'Pain Medicine Expert Witness',
          'Emergency Medicine Expert Witness',
          'Orthopedic Surgery Expert Witness',
        ],
      },
    ],
  };
  return <JsonLd data={graph} id="homepage" />;
}

interface FAQ {
  question: string;
  answer: string;
}

export function FAQPageSchema({ faqs }: { faqs: FAQ[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
  return <JsonLd data={data} id="faq" />;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
  return <JsonLd data={data} id="breadcrumb" />;
}

interface DivisionSchemaProps {
  name: string;
  slug: string;
  description: string;
  practiceAreas: string[];
}

export function DivisionSchema({ name, slug, description, practiceAreas }: DivisionSchemaProps) {
  const url = `${BASE_URL}/divisions/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalSpecialty',
        '@id': `${url}#specialty`,
        name,
        url,
        description,
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${name} Expert Witness Services`,
        url,
        description,
        serviceType: 'Medical-Legal Expert Witness Consulting',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        category: practiceAreas,
        audience: {
          '@type': 'Audience',
          audienceType: 'Attorneys',
        },
      },
    ],
  };
  return <JsonLd data={data} id={`division-${slug}`} />;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  slug: string;
  author?: { name: string; slug?: string };
  keywords?: string[];
}

export function ArticleSchema({
  title,
  description,
  date,
  modifiedDate,
  slug,
  author,
  keywords,
}: ArticleSchemaProps) {
  const url = `${BASE_URL}/blog/${slug}`;
  const authorEntity = author?.slug
    ? { '@type': 'Person', '@id': `${BASE_URL}/experts/${author.slug}#person`, name: author.name }
    : { '@type': 'Organization', name: author?.name ?? SITE_NAME };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: modifiedDate || date,
    author: authorEntity,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORG_LOGO,
      },
    },
    image: ogImageUrl(title),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  };
  return <JsonLd data={data} id={`article-${slug}`} />;
}

interface PersonSchemaProps {
  slug: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  credentials: string[];
  categories: string[];
  photo: string;
  sameAs?: string[];
}

export function PersonSchema({
  slug,
  name,
  role,
  title,
  bio,
  credentials,
  categories,
  photo,
  sameAs = [],
}: PersonSchemaProps) {
  const url = `${BASE_URL}/experts/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name,
    url,
    jobTitle: title,
    description: bio.split('\n')[0],
    image: photo.startsWith('http') ? photo : `${BASE_URL}${photo}`,
    affiliation: { '@id': `${BASE_URL}/#organization` },
    memberOf: { '@id': `${BASE_URL}/#organization` },
    worksFor: { '@id': `${BASE_URL}/#organization` },
    hasOccupation: {
      '@type': 'Occupation',
      name: role,
    },
    alumniOf: credentials
      .filter((c) => /Duke|Stanford|Harvard|Mayo|Hopkins|Emory|UC[A-Z]|USC|UCLA|Yale|Penn|Columbia|Cornell|Northwestern|Washington/i.test(c))
      .map((c) => ({ '@type': 'EducationalOrganization', name: c })),
    knowsAbout: categories,
    sameAs,
  };
  return <JsonLd data={data} id={`person-${slug}`} />;
}

export { BASE_URL };
