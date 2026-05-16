/**
 * Cross-link helpers used to auto-generate internal links between
 * blog posts, divisions, and physician profiles.
 *
 * Single source of truth for these mappings so the implementations on
 * /blog/[slug], /divisions/[slug], and /experts/[slug] stay consistent.
 */
import { blogPosts, type BlogPost } from '@/blog/posts';
import { divisions, type Division } from '@/data/divisions';
import { physicians, type Physician } from '@/data/physicians';

/**
 * Heuristic: map a blog post's keywords to a primary division by checking
 * which division slug or name appears in the post's keywords. Returns
 * undefined if no match.
 */
export function getPrimaryDivisionForPost(post: BlogPost): Division | undefined {
  const joined = post.keywords.join(' ').toLowerCase() + ' ' + post.title.toLowerCase();
  const candidates: Array<{ d: Division; score: number }> = [];

  for (const d of divisions) {
    let score = 0;
    if (joined.includes(d.slug)) score += 5;
    if (joined.includes(d.name.toLowerCase())) score += 4;
    // Practice-area keyword matches
    for (const pa of d.practiceAreas) {
      const paName = pa.title.toLowerCase();
      // First word of practice area (proper noun likely to be a topic)
      const firstWord = paName.split(/\W+/)[0];
      if (firstWord && firstWord.length > 4 && joined.includes(firstWord)) score += 1;
    }
    if (score > 0) candidates.push({ d, score });
  }

  // Light hardcoded heuristics for topics that don't share words with
  // division names but clearly belong to one (e.g. "TBI" -> neurology).
  const topicMap: Array<[RegExp, string]> = [
    [/\btbi\b|traumatic brain injury|concussion/i, 'neurology'],
    [/\bstroke\b|tpa|thrombectomy/i, 'stroke-vascular-neurology'],
    [/\bsepsis\b|icu|critical care|ards|ventilator/i, 'critical-care'],
    [/\bcolon\b|colonoscopy|ercp|gi\b|gastro|endoscop/i, 'gastroenterology'],
    [/\bopioid\b|pain|crps|epidural/i, 'anesthesiology'],
    [/\bmeningitis\b|status epilepticus|seizure/i, 'neurology'],
  ];
  for (const [re, slug] of topicMap) {
    if (re.test(joined)) {
      const d = divisions.find((x) => x.slug === slug);
      if (d) candidates.push({ d, score: 6 });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.d;
}

/**
 * Find up to `n` blog posts most relevant to `post` by shared keyword count,
 * excluding `post` itself.
 */
export function getRelatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const myKw = new Set(post.keywords.map((k) => k.toLowerCase()));
  const myDivision = getPrimaryDivisionForPost(post);

  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const overlap = p.keywords.filter((k) => myKw.has(k.toLowerCase())).length;
      const sharesDivision = myDivision && getPrimaryDivisionForPost(p)?.slug === myDivision.slug;
      const score = overlap * 3 + (sharesDivision ? 2 : 0);
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.p.date) - +new Date(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}

/** All blog posts whose primary division matches the given slug. */
export function getPostsForDivision(divisionSlug: string, n?: number): BlogPost[] {
  const matched = blogPosts.filter((p) => {
    const d = getPrimaryDivisionForPost(p);
    return d?.slug === divisionSlug;
  });
  return n ? matched.slice(0, n) : matched;
}

/** A featured physician for a given division (the first one, deterministically). */
export function getFeaturedPhysicianForDivision(
  divisionSlug: string,
): Physician | undefined {
  const matches = physicians.filter((p) => p.categories.includes(divisionSlug));
  const featured = matches.find((p) => p.featured);
  return featured ?? matches[0];
}

/** Blog posts authored by a physician (matched by author name substring). */
export function getPostsByPhysician(physician: Physician): BlogPost[] {
  const last = physician.name.split(/\s+/).slice(-1)[0]?.replace(/[,.]/g, '');
  if (!last) return [];
  return blogPosts.filter((p) => p.author.includes(last));
}
