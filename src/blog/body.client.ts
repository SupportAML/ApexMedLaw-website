/**
 * Post body access — client implementation (aliased over body.ts in the client
 * build). The first post a visitor lands on comes from the JSON the prerender
 * embedded in the page; later client-side navigations fetch
 * /blog-data/<slug>.json.
 */
import type { PostBody } from './body';

export type { PostBody };

const cache = new Map<string, PostBody>();

if (typeof document !== 'undefined') {
  const el = document.getElementById('post-body-data');
  if (el?.textContent) {
    try {
      const body = JSON.parse(el.textContent) as PostBody;
      cache.set(body.slug, body);
    } catch {
      // Fall through to fetch.
    }
  }
}

export function getPostBody(slug: string): PostBody | undefined {
  return cache.get(slug);
}

export async function loadPostBody(slug: string): Promise<PostBody | undefined> {
  const hit = cache.get(slug);
  if (hit) return hit;
  const res = await fetch(`/blog-data/${slug}.json`);
  if (!res.ok) return undefined;
  const body = (await res.json()) as PostBody;
  cache.set(slug, body);
  return body;
}

export const EMBED_BODY = false;
