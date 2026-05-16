/**
 * Dynamic Open Graph image generator.
 *
 * Renders a 1200×630 PNG per page with the page title + ApexMedLaw brand.
 * Used by the SEO component to populate per-page og:image and twitter:image,
 * so each shared link previews with its own title instead of one shared
 * static og-image.jpg.
 *
 * Runs on Vercel's Edge runtime via @vercel/og. Cached at the edge for
 * 1 year (immutable per ?title=).
 *
 * Usage: /api/og?title=Encoded%20Page%20Title&subtitle=Optional
 */
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const BRAND_NAVY = '#0B1A2F';
const BRAND_ELECTRIC = '#3A6EFF';
const BRAND_WHITE = '#FFFFFF';

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const title = (searchParams.get('title') ?? 'ApexMedLaw').slice(0, 200);
    const subtitle = (
      searchParams.get('subtitle') ??
      'Physician-Led Medical-Legal Consulting'
    ).slice(0, 120);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: BRAND_NAVY,
            position: 'relative',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 20% 30%, rgba(58,110,255,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(58,110,255,0.15) 0%, transparent 50%)',
              display: 'flex',
            }}
          />
          {/* Brand bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: BRAND_WHITE,
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '999px',
                backgroundColor: BRAND_ELECTRIC,
                display: 'flex',
              }}
            />
            ApexMedLaw
          </div>
          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 'auto',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? '54px' : '68px',
                fontWeight: 800,
                color: BRAND_WHITE,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                maxWidth: '1000px',
                display: 'flex',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '26px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.3,
                maxWidth: '900px',
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          </div>
          {/* Bottom accent */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '8px',
              backgroundColor: BRAND_ELECTRIC,
              display: 'flex',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      },
    );
  } catch (err) {
    console.error('og image error:', err);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
