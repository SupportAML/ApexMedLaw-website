/**
 * Post body access — server (prerender) implementation. Reads posts.ts
 * directly. The client build aliases this module to body.client.ts
 * (vite.config.ts), which never imports posts.ts.
 */
import { blogPosts, getPostFaqs, type BlogPostFAQ } from './posts';

export interface PostBody {
  slug: string;
  content: string;
  faqs: BlogPostFAQ[];
}

export function getPostBody(slug: string): PostBody | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  return post ? { slug, content: post.content, faqs: getPostFaqs(slug) } : undefined;
}

export async function loadPostBody(slug: string): Promise<PostBody | undefined> {
  return getPostBody(slug);
}

/** The prerender embeds the body so the first client render needs no fetch. */
export const EMBED_BODY = true;
