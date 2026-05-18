/**
 * Generates dist/sitemap.xml from the route list at build time.
 * Run after vite build so dist/ exists. New blog posts/divisions/physicians
 * are picked up automatically because we re-enumerate the data on every build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const BASE = 'https://www.apexmedlaw.com';
const TODAY = new Date().toISOString().slice(0, 10);

const { divisions } = await import(pathToFileURL(path.join(root, 'src/data/divisions.ts')).href);
const { physicians } = await import(pathToFileURL(path.join(root, 'src/data/physicians.ts')).href);
const { blogPosts } = await import(pathToFileURL(path.join(root, 'src/blog/posts.ts')).href);

interface Entry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

const entries: Entry[] = [
  { loc: `${BASE}/`,        lastmod: TODAY, changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE}/experts`, lastmod: TODAY, changefreq: 'weekly',  priority: '0.9' },
  { loc: `${BASE}/blog`,    lastmod: TODAY, changefreq: 'daily',   priority: '0.9' },
];

for (const d of divisions as Array<{ slug: string }>) {
  entries.push({
    loc: `${BASE}/divisions/${d.slug}`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8',
  });
}

for (const p of blogPosts as Array<{ slug: string; date: string }>) {
  entries.push({
    loc: `${BASE}/blog/${p.slug}`,
    lastmod: p.date || TODAY,
    changefreq: 'monthly',
    priority: '0.7',
  });
}

for (const p of physicians as Array<{ slug: string }>) {
  entries.push({
    loc: `${BASE}/experts/${p.slug}`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.6',
  });
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) =>
    `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  ),
  '</urlset>',
  '',
].join('\n');

if (!fs.existsSync(distDir)) {
  console.error(`dist/ missing at ${distDir}. Run "vite build" first.`);
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`✓ Wrote sitemap.xml with ${entries.length} URLs`);
