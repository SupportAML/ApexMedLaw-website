/**
 * Google Tag Manager + GA4 bootstrap.
 *
 * Container ID is supplied via VITE_GTM_ID. If unset, no script is injected
 * (useful for local dev, CI, and preview deploys without a GTM property).
 * Custom events are flushed via window.dataLayer.
 *
 * Non-production environments (Vercel preview deploys, local dev) are tagged
 * `environment: 'staging'` so GTM rules can route away from the production
 * GA4 property. The matching <meta name="robots" content="noindex"> on
 * non-prod is emitted by the SEO component via VITE_PUBLIC_NOINDEX.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsEvent =
  | 'case_inquiry_submitted'
  | 'calendly_opened'
  | 'expert_profile_viewed'
  | 'division_page_viewed'
  | 'blog_post_viewed'
  | 'phone_clicked'
  | 'email_clicked';

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const containerId = import.meta.env.VITE_GTM_ID as string | undefined;
  if (!containerId) return;

  if (window.dataLayer && window.dataLayer.some((e) => e['gtm.start'])) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
    environment: import.meta.env.PROD ? 'production' : 'staging',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  document.head.appendChild(script);

  // Bare-noscript fallback iframe — appended to body once it exists.
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(containerId)}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

export function trackEvent(
  name: AnalyticsEvent | string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}

/**
 * Push a virtual page_view on every client-side route change so SPA
 * navigation gets attributed correctly in GA4. The first page_view is
 * emitted automatically by GTM's All Pages trigger; this function
 * supplies subsequent ones.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: title ?? document.title,
  });
}
