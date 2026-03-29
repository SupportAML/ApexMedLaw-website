import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/blog/posts';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';

// Division-keyed gradient palettes for blog card headers
const categoryGradients: Record<string, string> = {
  neurology: 'from-blue-600 to-blue-800',
  'critical care': 'from-teal-600 to-teal-800',
  gastroenterology: 'from-purple-600 to-purple-800',
  pain: 'from-amber-600 to-amber-800',
  default: 'from-slate-600 to-slate-800',
};

function getGradient(keywords: string[]): string {
  const joined = keywords.join(' ').toLowerCase();
  if (joined.includes('neuro') || joined.includes('tbi') || joined.includes('stroke') || joined.includes('brain')) return categoryGradients.neurology;
  if (joined.includes('icu') || joined.includes('critical') || joined.includes('sepsis')) return categoryGradients['critical care'];
  if (joined.includes('gi') || joined.includes('gastro') || joined.includes('colon') || joined.includes('endoscop')) return categoryGradients.gastroenterology;
  if (joined.includes('pain') || joined.includes('opioid')) return categoryGradients.pain;
  return categoryGradients.default;
}

function getCategory(keywords: string[]): string {
  const joined = keywords.join(' ').toLowerCase();
  if (joined.includes('neuro') || joined.includes('tbi') || joined.includes('stroke') || joined.includes('brain')) return 'Neurology';
  if (joined.includes('icu') || joined.includes('critical') || joined.includes('sepsis')) return 'Critical Care';
  if (joined.includes('gi') || joined.includes('gastro') || joined.includes('colon') || joined.includes('endoscop')) return 'Gastroenterology';
  if (joined.includes('pain') || joined.includes('opioid')) return 'Pain Medicine';
  return 'General';
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

const allCategories = ['All', 'Neurology', 'Critical Care', 'Gastroenterology', 'Pain Medicine'];

export function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return blogPosts;
    return blogPosts.filter((post) => getCategory(post.keywords) === activeFilter);
  }, [activeFilter]);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div className="relative">
      <SEO
        title="Insights & Resources"
        description="Expert perspectives on medical-legal litigation, expert witness standards, and consulting insights for attorneys."
        path="/blog"
      />
      <Navigation />
      <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-display-md text-foreground mb-3">
              Insights & Resources
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Expert perspectives on medical-legal litigation, expert witness standards,
              and consulting insights for attorneys.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-electric text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-electric/40 hover:text-electric'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-text-secondary text-center py-16">No posts in this category yet.</p>
          )}

          {/* Featured post — full width */}
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`} className="block group mb-10">
              <article className="bg-white rounded-2xl shadow-xs hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-clinical-200 overflow-hidden">
                {/* Gradient header */}
                <div className={`h-40 lg:h-48 bg-gradient-to-br ${getGradient(featuredPost.keywords)} flex items-end p-6 lg:p-8 relative`}>
                  <div className="absolute top-4 left-6 lg:left-8">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {getCategory(featuredPost.keywords)}
                    </span>
                  </div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight max-w-2xl">
                    {featuredPost.title}
                  </h2>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-3 text-sm text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {estimateReadTime(featuredPost.content)} min read
                    </span>
                    <span>·</span>
                    <span>{featuredPost.author}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {featuredPost.metaDescription}
                  </p>
                  <span className="flex items-center gap-1 text-sm font-medium text-electric group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Remaining posts — 2-column grid */}
          {remainingPosts.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-white rounded-2xl shadow-xs hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-clinical-200 overflow-hidden h-full flex flex-col">
                    {/* Gradient header — smaller */}
                    <div className={`h-24 bg-gradient-to-br ${getGradient(post.keywords)} flex items-end p-5 relative`}>
                      <span className="absolute top-3 left-5 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {getCategory(post.keywords)}
                      </span>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-3 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {estimateReadTime(post.content)} min
                        </span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-electric transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                        {post.metaDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.keywords.slice(0, 2).map((kw) => (
                          <span
                            key={kw}
                            className="flex items-center gap-1 text-xs px-2 py-0.5 bg-electric/5 text-electric rounded-full"
                          >
                            <Tag size={9} />
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
