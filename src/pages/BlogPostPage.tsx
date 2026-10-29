import { useEffect, useState, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Tag, Stethoscope } from 'lucide-react';
import { blogPosts, getPostMeta, getPostDivisions } from '@/blog/meta';
import { getPostBody, loadPostBody, EMBED_BODY, type PostBody } from '@/blog/body';
import { getSpecialtyName, getPhysiciansBySpecialty, type Physician } from '@/data/physicians';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { CaseReviewCTA } from '@/components/CaseReviewCTA';
import { SEO, BlogPostingSchema } from '@/components/SEO';
import { FAQSchema, BreadcrumbSchema } from '@/components/SEOSchemas';

/** Inline markdown: **bold**, *italic*, and [text](/internal-or-https-link). */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={j} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith('/') ? (
        <Link key={j} to={href} className="text-electric underline underline-offset-2 hover:text-electric/80">
          {label}
        </Link>
      ) : (
        <a key={j} href={href} target="_blank" rel="noopener" className="text-electric underline underline-offset-2 hover:text-electric/80">
          {label}
        </a>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={j}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderMarkdown(content: string) {
  // Simple markdown renderer for blog posts: ##/### headings, -/* and 1. lists,
  // --- rules, whole-line italic disclaimers, paragraphs with inline formatting.
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let key = 0;
  let list: { ordered: boolean; items: ReactNode[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((item, j) => (
      <li key={j} className="text-text-secondary leading-relaxed pl-1">
        {item}
      </li>
    ));
    elements.push(
      list.ordered ? (
        <ol key={key++} className="list-decimal pl-6 mb-4 space-y-2">{items}</ol>
      ) : (
        <ul key={key++} className="list-disc pl-6 mb-4 space-y-2">{items}</ul>
      ),
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push(renderInline((numbered ?? bullet)![1]));
      continue;
    }
    flushList();

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="font-display text-xl font-bold text-foreground mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={key++} className="my-8 border-clinical-200" />);
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(
        <p key={key++} className="text-sm text-text-secondary italic mt-4">
          {line.replace(/^\*|\*$/g, '')}
        </p>
      );
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(
        <p key={key++} className="text-text-secondary leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return elements;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostMeta(slug) : undefined;
  const [body, setBody] = useState<PostBody | undefined>(() => (slug ? getPostBody(slug) : undefined));

  useEffect(() => {
    if (!slug) return;
    let live = true;
    loadPostBody(slug).then((b) => {
      if (live) setBody(b);
    });
    return () => {
      live = false;
    };
  }, [slug]);

  // Ignore a body left over from the previous post during client-side navigation.
  const current = body?.slug === slug ? body : undefined;

  if (!post) {
    return (
      <div className="relative">
        <Navigation />
        <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="font-display text-display-md text-foreground mb-4">
              Post Not Found
            </h1>
            <Link to="/blog">
              <Button className="bg-electric hover:bg-electric/90 text-white rounded-full">
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const relatedDivisions = getPostDivisions(post.slug);
  // Dedup experts across the related specialties, preserving first-seen order.
  const relatedExperts: Physician[] = [];
  const seenExperts = new Set<string>();
  for (const divSlug of relatedDivisions) {
    for (const doc of getPhysiciansBySpecialty(divSlug)) {
      if (!seenExperts.has(doc.slug)) {
        seenExperts.add(doc.slug);
        relatedExperts.push(doc);
      }
    }
  }
  const relatedReading = blogPosts
    .filter((p) => p.slug !== post.slug && getPostDivisions(p.slug).some((d) => relatedDivisions.includes(d)))
    .slice(0, 3);

  return (
    <div className="relative">
      <SEO
        title={post.title}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />
      <BlogPostingSchema
        title={post.title}
        description={post.metaDescription}
        date={post.date}
        slug={post.slug}
        author={post.author}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      {current && current.faqs.length > 0 && <FAQSchema faqs={current.faqs} />}
      <Navigation />
      <main className="relative pt-24 pb-20 min-h-screen bg-clinical">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', { timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>·</span>
              <span>{post.author}</span>
            </div>

            <h1 className="font-display text-display-md text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 bg-electric/5 text-electric rounded-full"
                >
                  <Tag size={10} />
                  {kw}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose-nlc">
            {current ? renderMarkdown(current.content) : <p className="text-text-secondary">Loading…</p>}
          </div>
          {EMBED_BODY && current && (
            <script
              id="post-body-data"
              type="application/json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(current).replace(/</g, '\\u003c') }}
            />
          )}

          {/* FAQ — visible copy of the FAQPage structured data */}
          {current && current.faqs.length > 0 && (
            <section className="mt-16 pt-10 border-t border-clinical-200">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {current.faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                    <p className="text-text-secondary leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related specialties */}
          {relatedDivisions.length > 0 && (
            <div className="mt-16 pt-10 border-t border-clinical-200">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Related Specialties
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedDivisions.map((divSlug) => {
                  const name = getSpecialtyName(divSlug);
                  if (!name) return null;
                  return (
                    <Link
                      key={divSlug}
                      to={`/divisions/${divSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm bg-electric/5 text-electric hover:bg-electric/10 px-4 py-2 rounded-full transition-colors"
                    >
                      <Stethoscope size={14} />
                      {name} Expert Witnesses
                      <ArrowRight size={12} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related experts */}
          {relatedExperts.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Related Experts
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedExperts.slice(0, 4).map((doc) => (
                  <Link
                    key={doc.slug}
                    to={`/experts/${doc.slug}`}
                    className="group flex items-center gap-4 bg-white border border-clinical-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-clinical-100 shrink-0">
                      <img loading="lazy" decoding="async" src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-sm text-foreground truncate group-hover:text-electric transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-text-secondary truncate">{doc.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related reading */}
          {relatedReading.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Continue Reading
              </h2>
              <div className="space-y-3">
                {relatedReading.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group flex items-start gap-3 bg-white border border-clinical-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <ArrowRight size={16} className="text-electric shrink-0 mt-1" />
                    <span className="text-sm font-medium text-foreground group-hover:text-electric transition-colors">
                      {p.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <CaseReviewCTA
        subtext="Our board-certified physician experts are available for case review, expert testimony, and independent medical examinations nationwide. Request a case review and we will match you with the right expert."
      />
    </div>
  );
}
