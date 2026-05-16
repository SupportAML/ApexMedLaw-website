#!/usr/bin/env node
/**
 * Generate sitemap.xml and robots.txt in dist/ using the SSR routes manifest.
 * Runs after prerender as part of the build pipeline.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');

async function loadRoutes() {
  const mod = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
  return { routes: mod.buildRoutes(), siteUrl: mod.SITE_URL };
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemapXml(routes, siteUrl) {
  const urls = routes
    .filter((r) => r.inSitemap)
    .map((r) => {
      const loc = escapeXml(`${siteUrl}${r.path === '/' ? '' : r.path}`);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobotsTxt(siteUrl, noindex) {
  if (noindex) {
    return `# Non-production environment — keep crawlers out
User-agent: *
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  }
  return `User-agent: *
Allow: /

# Disallow Vercel preview metadata and serverless function paths from being
# indexed as content pages.
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
}

async function main() {
  const { routes, siteUrl } = await loadRoutes();
  const noindex = process.env.PUBLIC_NOINDEX === 'true';

  const sitemap = buildSitemapXml(routes, siteUrl);
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`✓ sitemap.xml written (${routes.filter((r) => r.inSitemap).length} URLs)`);

  const robots = buildRobotsTxt(siteUrl, noindex);
  await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf-8');
  console.log(`✓ robots.txt written${noindex ? ' (noindex mode)' : ''}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
