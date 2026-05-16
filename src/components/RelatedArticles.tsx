import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { type BlogPost } from '@/blog/posts';

/**
 * "Related articles" block rendered at the bottom of every blog post.
 * Picks 3 most relevant posts by shared keywords + shared primary division
 * (computed once at module load via getRelatedPosts).
 */
export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-label="Related articles"
      className="mt-16 border-t border-clinical-200 pt-10"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        Related articles
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block bg-white border border-clinical-200 rounded-2xl p-5 hover:border-electric/40 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-electric transition-colors leading-snug line-clamp-3">
              {post.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {post.metaDescription}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-electric group-hover:gap-2 transition-all">
              Read article <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
