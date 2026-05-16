#!/usr/bin/env node
/**
 * Build-time SEO assertions over the pre-rendered HTML in dist/.
 * Validates every page has:
 *   - a unique <title>
 *   - a unique <meta name="description"> under 160 chars
 *   - exactly one <link rel="canonical">
 *   - Open Graph tags (og:title, og:description, og:url, og:image)
 *   - at least one valid <script type="application/ld+json"> block
 *
 * Fails the build (exit 1) on any violation.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(p)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(p);
    }
  }
  return out;
}

function pickAttr(html, tag, attr) {
  const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}=("[^"]*"|'[^']*')`, 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    out.push(m[1].slice(1, -1));
  }
  return out;
}

function checkPage(filePath, html) {
  const errors = [];
  const rel = path.relative(distDir, filePath);
  // Skip the 404 alias which is a copy of /404/index.html.
  if (rel === '404.html') return errors;

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch) errors.push('missing <title>');
  const title = titleMatch?.[1]?.trim() ?? '';

  // Meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=("[^"]*"|'[^']*')/i);
  if (!descMatch) {
    errors.push('missing meta description');
  } else {
    const desc = descMatch[1].slice(1, -1);
    if (desc.length > 160) errors.push(`meta description ${desc.length} chars (>160)`);
    if (desc.length < 50) errors.push(`meta description ${desc.length} chars (<50)`);
  }

  // Canonical
  const canonicals = pickAttr(html, 'link', 'href').filter((_, idx) => {
    const match = html.match(new RegExp(`<link[^>]*rel=["']canonical["'][^>]*>`, 'gi'));
    return match;
  });
  const canonicalMatches = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) ?? [];
  if (canonicalMatches.length === 0) errors.push('missing <link rel="canonical">');
  if (canonicalMatches.length > 1) errors.push(`${canonicalMatches.length} canonical tags (expected 1)`);

  // Open Graph
  for (const og of ['og:title', 'og:description', 'og:url', 'og:image']) {
    const re = new RegExp(`<meta[^>]*property=["']${og}["']`, 'i');
    if (!re.test(html)) errors.push(`missing ${og}`);
  }

  // JSON-LD
  const ldMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  if (ldMatches.length === 0) {
    errors.push('no application/ld+json blocks');
  } else {
    for (const block of ldMatches) {
      const json = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '').trim();
      try {
        JSON.parse(json);
      } catch (err) {
        errors.push(`invalid JSON-LD: ${err.message}`);
      }
    }
  }

  return { rel, title, errors };
}

async function main() {
  try {
    await stat(distDir);
  } catch {
    console.error(`dist/ not found at ${distDir}`);
    process.exit(1);
  }

  const files = await walk(distDir);
  console.log(`› check-seo: scanning ${files.length} HTML files`);

  const titles = new Map();
  const descriptions = new Map();
  let total = 0;
  let failed = 0;

  for (const file of files) {
    const html = await readFile(file, 'utf-8');
    const result = checkPage(file, html);
    if (!result || result.errors === undefined) continue;
    total++;

    if (result.errors.length) {
      failed++;
      console.error(`× ${result.rel}`);
      for (const e of result.errors) console.error(`  - ${e}`);
    }

    // Track duplicates
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=("[^"]*"|'[^']*')/i);
    const desc = descMatch?.[1].slice(1, -1) ?? '';
    if (titles.has(result.title)) {
      titles.get(result.title).push(result.rel);
    } else {
      titles.set(result.title, [result.rel]);
    }
    if (desc) {
      if (descriptions.has(desc)) {
        descriptions.get(desc).push(result.rel);
      } else {
        descriptions.set(desc, [result.rel]);
      }
    }
  }

  let dupErrors = 0;
  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      console.error(`× duplicate <title> "${title}" used on: ${paths.join(', ')}`);
      dupErrors++;
    }
  }
  for (const [desc, paths] of descriptions) {
    if (paths.length > 1) {
      console.error(`× duplicate meta description "${desc.slice(0, 60)}..." used on: ${paths.join(', ')}`);
      dupErrors++;
    }
  }

  if (failed > 0 || dupErrors > 0) {
    console.error(`✗ check-seo: ${failed} pages with errors, ${dupErrors} duplicates`);
    process.exit(1);
  }
  console.log(`✓ check-seo: all ${total} pages pass`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
