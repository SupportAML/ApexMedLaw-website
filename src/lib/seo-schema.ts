/**
 * Pure JSON-LD schema builders and shared SEO constants.
 *
 * Kept free of React / react-helmet-async so the structured-data logic can be
 * unit-tested in isolation (see scripts/test.ts) and reused by the Helmet
 * wrapper components in SEO.tsx and SEOSchemas.tsx.
 *
 * The canonical host is the verified Google Search Console www URL-prefix
 * property. Keep it in sync with public/robots.txt and scripts/generate-sitemap.ts.
 */
export const BASE_URL = 'https://www.apexmedlaw.com';

// No dedicated og-image.jpg asset exists in public/; fall back to the site logo
// so og:image and BlogPosting image always resolve.
export const LOGO_IMAGE = `${BASE_URL}/logo.png`;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL, or a site-relative path (e.g. "/blog") prefixed with the base URL. */
  url: string;
}

export interface BlogPostingSchemaInput {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  /** Defaults to the site logo when a post has no dedicated image. */
  image?: string;
  dateModified?: string;
}

/** Builds the FAQPage JSON-LD object. */
export function buildFaqSchema(faqs: FAQItem[]) {
  return {
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
}

/** Builds the BreadcrumbList JSON-LD object. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/** Builds the BlogPosting JSON-LD object. */
export function buildBlogPostingSchema({
  title,
  description,
  date,
  slug,
  author,
  image,
  dateModified,
}: BlogPostingSchemaInput) {
  const url = `${BASE_URL}/blog/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || LOGO_IMAGE,
    datePublished: date,
    dateModified: dateModified || date,
    author: {
      '@type': 'Organization',
      name: author || 'ApexMedLaw',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApexMedLaw',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_IMAGE,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  };
}
