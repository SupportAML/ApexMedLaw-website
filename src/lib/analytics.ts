/**
 * Google Tag Manager + GA4 bootstrap.
 *
 * Container ID is supplied via VITE_GTM_ID. If unset, no script is injected
 * (useful for local dev and preview deploys). Custom events are flushed via
 * window.dataLayer.
 *
 * Non-production environments are tagged as 'staging' so GTM rules can route
 * away from production GA4 properties.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const containerId = import.meta.env.VITE_GTM_ID as string | undefined;
  if (!containerId) return;

  // Already initialised (e.g. via hot reload in dev) — skip.
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
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}
