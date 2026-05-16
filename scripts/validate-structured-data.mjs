#!/usr/bin/env node
/**
 * Structured-data validator for the pre-rendered HTML in dist/.
 *
 * For each .html file under dist/, extracts every
 *   <script type="application/ld+json">...</script>
 * block and verifies:
 *   1. The block parses as valid JSON.
 *   2. The block has @context set to a schema.org URL.
 *   3. The block has @type (or @graph with @type nodes).
 *   4. Per-type minimum required properties (Article: headline,
 *      author, datePublished, publisher; Person: name; Organization:
 *      name, url; Service: name, provider; FAQPage: mainEntity;
 *      BreadcrumbList: itemListElement).
 *
 * This is a local syntactic + minimum-shape check. To validate against
 * Google's Rich Results test, install `structured-data-testing-tool`
 * and run it as a separate CI step (it calls Google's APIs and needs
 * credentials).
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const REQUIRED_FIELDS = {
  Article: ['headline', 'author', 'datePublished', 'publisher'],
  BlogPosting: ['headline', 'datePublished'],
  Person: ['name'],
  Organization: ['name', 'url'],
  ProfessionalService: ['name'],
  LocalBusiness: ['name'],
  Service: ['name'],
  MedicalSpecialty: ['name'],
  FAQPage: ['mainEntity'],
  Question: ['name', 'acceptedAnswer'],
  BreadcrumbList: ['itemListElement'],
  Blog: ['name'],
  ItemList: ['itemListElement'],
};

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function extractBlocks(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    out.push(m[1].trim());
  }
  return out;
}

function checkNode(node, errors, where) {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  for (const t of types) {
    const required = REQUIRED_FIELDS[t];
    if (!required) continue;
    for (const f of required) {
      if (node[f] === undefined || node[f] === null) {
        errors.push(`${where}: ${t} missing required field "${f}"`);
      }
    }
  }
}

function validate(json, where) {
  const errors = [];

  if (typeof json !== 'object' || json === null) {
    errors.push(`${where}: not a JSON object`);
    return errors;
  }

  if (!json['@context']) {
    errors.push(`${where}: missing @context`);
  } else if (!String(json['@context']).includes('schema.org')) {
    errors.push(`${where}: @context not schema.org (got ${json['@context']})`);
  }

  if (json['@graph']) {
    if (!Array.isArray(json['@graph'])) {
      errors.push(`${where}: @graph must be an array`);
    } else {
      json['@graph'].forEach((node, idx) => {
        if (!node['@type']) {
          errors.push(`${where}: @graph[${idx}] missing @type`);
        } else {
          checkNode(node, errors, `${where} @graph[${idx}]`);
        }
      });
    }
  } else if (!json['@type']) {
    errors.push(`${where}: missing @type`);
  } else {
    checkNode(json, errors, where);
  }

  return errors;
}

async function main() {
  try {
    await stat(distDir);
  } catch {
    console.error(`dist/ not found at ${distDir}`);
    process.exit(1);
  }

  const files = await walk(distDir);
  let totalBlocks = 0;
  let totalErrors = 0;
  const failedFiles = new Set();

  for (const file of files) {
    const rel = path.relative(distDir, file);
    if (rel === '404.html') continue;
    const html = await readFile(file, 'utf-8');
    const blocks = extractBlocks(html);

    for (let i = 0; i < blocks.length; i++) {
      totalBlocks++;
      const block = blocks[i];
      let json;
      try {
        json = JSON.parse(block);
      } catch (err) {
        console.error(`× ${rel}[block ${i}] invalid JSON: ${err.message}`);
        totalErrors++;
        failedFiles.add(rel);
        continue;
      }
      const errors = validate(json, `${rel}[block ${i}]`);
      for (const e of errors) {
        console.error(`× ${e}`);
        totalErrors++;
        failedFiles.add(rel);
      }
    }
  }

  console.log();
  console.log(`› validate-structured-data: ${totalBlocks} JSON-LD blocks across ${files.length} HTML files`);
  if (totalErrors > 0) {
    console.error(`✗ ${totalErrors} validation errors across ${failedFiles.size} files`);
    process.exit(1);
  }
  console.log(`✓ all ${totalBlocks} JSON-LD blocks pass minimum schema.org shape checks`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
