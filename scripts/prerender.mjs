#!/usr/bin/env node
/**
 * Pre-render every route in src/lib/routes.ts to a static .html file in dist/.
 *
 * Pipeline (orchestrated from package.json build script):
 *   1. tsc -b                  (type-check)
 *   2. vite build              (client bundle -> dist/)
 *   3. vite build --ssr ...    (server bundle -> dist-ssr/)
 *   4. node scripts/prerender  (this file: render every route)
 *   5. node scripts/generate-sitemap   (sitemap.xml + robots.txt)
 *
 * React 19's `renderToString` emits document-metadata tags (<title>, <meta>,
 * <link>, <script type="application/ld+json">) inline in the body output —
 * they get hoisted to <head> automatically by React 19 on the client, but for
 * the static HTML served to crawlers we hoist them manually here.
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');

// Tags emitted inside the body that should be hoisted to <head>.
const HOIST_PATTERNS = [
  /<title\b[^>]*>[\s\S]*?<\/title>/i,
  /<meta\b[^>]*\/?>/gi,
  /<link\b[^>]*\/?>/gi,
  /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
];

function extractHoistableTags(bodyHtml) {
  const tags = [];
  let remaining = bodyHtml;

  // Title (only one, take the first)
  const titleMatch = remaining.match(HOIST_PATTERNS[0]);
  if (titleMatch) {
    tags.push(titleMatch[0]);
    remaining = remaining.replace(titleMatch[0], '');
  }

  // Iterate over the rest, collecting then stripping
  for (let i = 1; i < HOIST_PATTERNS.length; i++) {
    const pattern = HOIST_PATTERNS[i];
    const matches = remaining.match(pattern);
    if (matches) {
      for (const m of matches) {
        tags.push(m);
      }
      remaining = remaining.replace(pattern, '');
    }
  }

  return { tags, body: remaining };
}

function dedupeHeadTags(tags) {
  // Keep only the first <title>; dedupe <meta name|property|http-equiv|charset>
  // by their key attribute; allow multiple <link>s and JSON-LD blocks.
  const seenMeta = new Set();
  const out = [];
  let seenTitle = false;
  for (const tag of tags) {
    if (/^<title\b/i.test(tag)) {
      if (seenTitle) continue;
      seenTitle = true;
      out.push(tag);
      continue;
    }
    if (/^<meta\b/i.test(tag)) {
      const key =
        tag.match(/\b(name|property|http-equiv|charset)=("[^"]*"|'[^']*')/i)?.[0] ??
        tag;
      if (seenMeta.has(key)) continue;
      seenMeta.add(key);
      out.push(tag);
      continue;
    }
    out.push(tag);
  }
  return out;
}

function injectHead(template, headTags) {
  let out = template;

  // Strip template fallback <title> and <meta name="description"> if the
  // page provided its own.
  const hasPageTitle = headTags.some((t) => /^<title\b/i.test(t));
  const hasPageDesc = headTags.some(
    (t) => /^<meta\b/i.test(t) && /\bname=["']description["']/i.test(t),
  );
  if (hasPageTitle) {
    out = out.replace(/<title>[\s\S]*?<\/title>\s*/, '');
  }
  if (hasPageDesc) {
    out = out.replace(/<meta\s+name="description"[^>]*>\s*/, '');
  }
  out = out.replace('<!--app-head-->', headTags.join('\n    '));
  return out;
}

async function loadTemplate() {
  return readFile(path.join(distDir, 'index.html'), 'utf-8');
}

async function loadRenderModule() {
  const entry = path.join(ssrDir, 'entry-server.js');
  if (!existsSync(entry)) {
    throw new Error(`SSR bundle missing at ${entry} — did "vite build --ssr" run?`);
  }
  return import(pathToFileURL(entry).href);
}

function routeToOutPath(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html');
  const cleaned = routePath.replace(/^\//, '');
  return path.join(distDir, cleaned, 'index.html');
}

async function writeHtml(outPath, html) {
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf-8');
}

async function main() {
  console.log('› prerender: loading template + SSR bundle');
  const template = await loadTemplate();
  const { render, buildRoutes } = await loadRenderModule();
  const routes = buildRoutes();

  console.log(`› prerender: rendering ${routes.length} routes`);
  let count = 0;
  for (const route of routes) {
    try {
      const { html: appHtml } = render(route.path);
      const { tags, body } = extractHoistableTags(appHtml);
      const headTags = dedupeHeadTags(tags);
      let pageHtml = template.replace('<!--app-html-->', body);
      pageHtml = injectHead(pageHtml, headTags);

      const outPath = routeToOutPath(route.path);
      await writeHtml(outPath, pageHtml);
      count++;
      if (count % 10 === 0) console.log(`  rendered ${count}/${routes.length}`);
    } catch (err) {
      console.error(`× failed to render ${route.path}:`, err);
      process.exitCode = 1;
    }
  }
  console.log(`✓ prerender: ${count}/${routes.length} routes written`);

  // Produce dist/404.html alias from the rendered /404/index.html for Vercel.
  const notFoundSrc = path.join(distDir, '404', 'index.html');
  if (existsSync(notFoundSrc)) {
    await writeFile(path.join(distDir, '404.html'), await readFile(notFoundSrc, 'utf-8'));
    console.log('✓ prerender: 404.html alias written');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
