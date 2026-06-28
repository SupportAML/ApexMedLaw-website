/**
 * Lightweight test runner for the SEO/JSON-LD work.
 *
 * The repo has no test framework configured, so these tests run through the
 * already-present `tsx` loader (no new dependency). Run with `npm test`.
 *
 * They cover the pure JSON-LD builders (FAQPage, BreadcrumbList, BlogPosting),
 * the www canonical base URL, and the authored FAQ content for every division
 * and blog post.
 */
import assert from 'node:assert/strict';

import {
  buildBlogPostingSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '../src/lib/seo-schema.ts';
import { divisions, getDivisionFaqs, getDivisionBySlug } from '../src/data/divisions.ts';
import { blogPosts, getPostFaqs, postDivisions, getPostsByDivision } from '../src/blog/posts.ts';
import { SPECIALTIES } from '../src/data/physicians.ts';

const BASE = 'https://www.apexmedlaw.com';

let passed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failures.push(`✗ ${name}\n    ${(err as Error).message.split('\n').join('\n    ')}`);
  }
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === 'string' && v.trim().length > 0;
}

// ---- FAQPage builder ----
test('buildFaqSchema emits a FAQPage with Question/Answer entities', () => {
  const schema = buildFaqSchema([
    { question: 'Q1?', answer: 'A1.' },
    { question: 'Q2?', answer: 'A2.' },
  ]);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, 2);
  assert.equal(schema.mainEntity[0]['@type'], 'Question');
  assert.equal(schema.mainEntity[0].name, 'Q1?');
  assert.equal(schema.mainEntity[0].acceptedAnswer['@type'], 'Answer');
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, 'A1.');
});

// ---- BreadcrumbList builder ----
test('buildBreadcrumbSchema numbers positions and resolves relative URLs to the www base', () => {
  const schema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'A Post', url: 'https://www.apexmedlaw.com/blog/a-post' },
  ]);
  assert.equal(schema['@type'], 'BreadcrumbList');
  assert.equal(schema.itemListElement.length, 3);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[0].item, `${BASE}/`);
  assert.equal(schema.itemListElement[1].position, 2);
  assert.equal(schema.itemListElement[1].item, `${BASE}/blog`);
  // Absolute URLs are passed through untouched.
  assert.equal(schema.itemListElement[2].item, 'https://www.apexmedlaw.com/blog/a-post');
});

// ---- BlogPosting builder ----
test('buildBlogPostingSchema produces a BlogPosting with author, dates, image and www URL', () => {
  const schema = buildBlogPostingSchema({
    title: 'My Title',
    description: 'desc',
    date: '2026-03-27',
    slug: 'my-slug',
    author: 'AML Editorial',
  });
  assert.equal(schema['@type'], 'BlogPosting');
  assert.equal(schema.headline, 'My Title');
  assert.equal(schema.author.name, 'AML Editorial');
  assert.equal(schema.datePublished, '2026-03-27');
  // dateModified defaults to datePublished when not provided.
  assert.equal(schema.dateModified, '2026-03-27');
  // Falls back to the site logo for posts with no image.
  assert.equal(schema.image, `${BASE}/logo.png`);
  assert.equal(schema.url, `${BASE}/blog/my-slug`);
  assert.equal(schema.mainEntityOfPage['@id'], `${BASE}/blog/my-slug`);
  assert.equal(schema.publisher.logo.url, `${BASE}/logo.png`);
});

test('blog post schema URLs use the www canonical host', () => {
  const schema = buildBlogPostingSchema({ title: 't', description: 'd', date: '2026-01-01', slug: 's' });
  assert.ok(schema.url.startsWith('https://www.apexmedlaw.com/'), `expected www host, got ${schema.url}`);
  assert.equal(schema.author.name, 'ApexMedLaw'); // default author
});

// ---- Division FAQ content ----
test('every division has 4-6 well-formed FAQs', () => {
  for (const d of divisions) {
    const faqs = getDivisionFaqs(d.slug);
    assert.ok(faqs.length >= 4 && faqs.length <= 6, `${d.slug} has ${faqs.length} FAQs (expected 4-6)`);
    for (const f of faqs) {
      assert.ok(isNonEmptyString(f.question), `${d.slug} has an empty question`);
      assert.ok(isNonEmptyString(f.answer), `${d.slug} has an empty answer`);
    }
  }
});

// ---- Blog post FAQ content ----
test('every blog post has 4-6 well-formed FAQs', () => {
  for (const p of blogPosts) {
    const faqs = getPostFaqs(p.slug);
    assert.ok(faqs.length >= 4 && faqs.length <= 6, `${p.slug} has ${faqs.length} FAQs (expected 4-6)`);
    for (const f of faqs) {
      assert.ok(isNonEmptyString(f.question), `${p.slug} has an empty question`);
      assert.ok(isNonEmptyString(f.answer), `${p.slug} has an empty answer`);
    }
  }
});

// ---- Division deep content ----
test('every division has well-formed deep content (overview, case types, expert questions, Daubert, process)', () => {
  for (const d of divisions) {
    const full = getDivisionBySlug(d.slug);
    assert.ok(full, `${d.slug} not resolvable`);
    assert.ok((full!.overview?.length ?? 0) >= 1, `${d.slug} missing overview`);
    for (const p of full!.overview ?? []) assert.ok(isNonEmptyString(p), `${d.slug} empty overview paragraph`);

    assert.ok((full!.caseTypes?.length ?? 0) >= 5, `${d.slug} has ${full!.caseTypes?.length ?? 0} case types (expected >=5)`);
    for (const c of full!.caseTypes ?? []) assert.ok(isNonEmptyString(c), `${d.slug} empty case type`);

    assert.ok((full!.expertQuestions?.length ?? 0) >= 5, `${d.slug} has ${full!.expertQuestions?.length ?? 0} expert questions (expected >=5)`);
    for (const q of full!.expertQuestions ?? []) assert.ok(isNonEmptyString(q), `${d.slug} empty expert question`);

    assert.ok((full!.daubert?.length ?? 0) >= 1, `${d.slug} missing Daubert content`);
    for (const p of full!.daubert ?? []) assert.ok(isNonEmptyString(p), `${d.slug} empty Daubert paragraph`);

    assert.ok((full!.whatToExpect?.length ?? 0) >= 4, `${d.slug} has ${full!.whatToExpect?.length ?? 0} engagement steps (expected >=4)`);
    for (const s of full!.whatToExpect ?? []) {
      assert.ok(isNonEmptyString(s.title), `${d.slug} empty engagement step title`);
      assert.ok(isNonEmptyString(s.description), `${d.slug} empty engagement step description`);
    }
  }
});

// ---- Blog <-> division internal-linking mapping ----
test('every post→division mapping references real divisions, and every post maps to at least one division', () => {
  const divSlugs = new Set(divisions.map((d) => d.slug));
  const specialtySlugs = new Set(SPECIALTIES.map((s) => s.slug));
  for (const post of blogPosts) {
    const mapped = postDivisions[post.slug] ?? [];
    assert.ok(mapped.length >= 1, `${post.slug} maps to no divisions`);
    for (const d of mapped) {
      assert.ok(divSlugs.has(d), `${post.slug} maps to unknown division "${d}"`);
      assert.ok(specialtySlugs.has(d), `${post.slug} maps to non-specialty "${d}"`);
    }
  }
});

test('getPostsByDivision is the inverse of the post→division mapping', () => {
  for (const d of divisions) {
    const posts = getPostsByDivision(d.slug);
    for (const p of posts) {
      assert.ok((postDivisions[p.slug] ?? []).includes(d.slug), `${p.slug} should list ${d.slug}`);
    }
  }
});

// ---- Report ----
if (failures.length > 0) {
  console.error(`\n${failures.join('\n\n')}\n`);
  console.error(`✗ ${failures.length} failing, ${passed} passing`);
  process.exit(1);
}
console.log(`✓ ${passed} passing`);
