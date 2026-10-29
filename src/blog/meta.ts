/**
 * Client-safe blog metadata. Pages import from here, never from posts.ts, so
 * the full post text stays out of the client bundle (see
 * scripts/generate-blog-index.ts).
 */
import { blogIndex } from './index.generated';

export interface BlogPostMeta {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  author: string;
  keywords: string[];
  readMinutes: number;
  divisions: string[];
}

export const blogPosts: BlogPostMeta[] = blogIndex;

export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return blogIndex.find((p) => p.slug === slug);
}

export function getPostDivisions(slug: string): string[] {
  return getPostMeta(slug)?.divisions ?? [];
}

/** Blog posts relevant to a given division, for "Related reading" blocks. */
export function getPostsByDivision(divisionSlug: string): BlogPostMeta[] {
  return blogIndex.filter((p) => p.divisions.includes(divisionSlug));
}
