/**
 * Canonical list of every static route on apexmedlaw.com.
 *
 * Used at build time by:
 *   - scripts/prerender.mjs (renders one HTML file per route)
 *   - scripts/generate-sitemap.mjs (sitemap.xml)
 *   - scripts/check-seo.mjs (per-route SEO assertions)
 *
 * Updated automatically when new divisions, physicians, or blog posts are
 * added — the data files are the source of truth.
 */

import { divisions } from '@/data/divisions';
import { physicians } from '@/data/physicians';
import { blogPosts } from '@/blog/posts';

export type RoutePriority = 1.0 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
export type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface RouteEntry {
  /** URL path, no trailing slash (except '/' for home). */
  path: string;
  /** Last modified date (ISO 8601). */
  lastmod: string;
  /** sitemap.xml change frequency hint. */
  changefreq: ChangeFreq;
  /** sitemap.xml priority. */
  priority: RoutePriority;
  /** Whether this route should be included in sitemap.xml. */
  inSitemap?: boolean;
}

const BUILD_DATE = new Date().toISOString().slice(0, 10);

function latestBlogDate(): string {
  return blogPosts
    .map((p) => p.date)
    .sort()
    .at(-1) ?? BUILD_DATE;
}

export function buildRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  // Homepage
  routes.push({
    path: '/',
    lastmod: BUILD_DATE,
    changefreq: 'weekly',
    priority: 1.0,
    inSitemap: true,
  });

  // Experts index
  routes.push({
    path: '/experts',
    lastmod: BUILD_DATE,
    changefreq: 'weekly',
    priority: 0.9,
    inSitemap: true,
  });

  // Blog index
  routes.push({
    path: '/blog',
    lastmod: latestBlogDate(),
    changefreq: 'weekly',
    priority: 0.8,
    inSitemap: true,
  });

  // Divisions
  for (const d of divisions) {
    routes.push({
      path: `/divisions/${d.slug}`,
      lastmod: BUILD_DATE,
      changefreq: 'monthly',
      priority: 0.8,
      inSitemap: true,
    });
  }

  // Physician profiles
  for (const p of physicians) {
    routes.push({
      path: `/experts/${p.slug}`,
      lastmod: BUILD_DATE,
      changefreq: 'monthly',
      priority: 0.7,
      inSitemap: true,
    });
  }

  // Blog posts
  for (const post of blogPosts) {
    routes.push({
      path: `/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'yearly',
      priority: 0.6,
      inSitemap: true,
    });
  }

  // 404 page is pre-rendered for Vercel's notFound handler but excluded from sitemap.
  routes.push({
    path: '/404',
    lastmod: BUILD_DATE,
    changefreq: 'yearly',
    priority: 0.1,
    inSitemap: false,
  });

  return routes;
}

export const SITE_URL = 'https://www.apexmedlaw.com';
