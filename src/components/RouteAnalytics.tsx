import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, type AnalyticsEvent } from '@/lib/analytics';

/**
 * Fires a GTM page_view event on every client-side route change, plus
 * page-type-specific events for division pages, expert profiles, and blog
 * posts (matching the events expected by the GTM configuration).
 *
 * Mount inside the Router and adjacent to <App />.
 */
export function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);

    let pageTypeEvent: AnalyticsEvent | undefined;
    if (/^\/divisions\//.test(location.pathname)) pageTypeEvent = 'division_page_viewed';
    else if (/^\/experts\/[^/]+$/.test(location.pathname)) pageTypeEvent = 'expert_profile_viewed';
    else if (/^\/blog\/[^/]+$/.test(location.pathname)) pageTypeEvent = 'blog_post_viewed';

    if (pageTypeEvent) {
      trackEvent(pageTypeEvent, { path: location.pathname });
    }
  }, [location.pathname, location.search]);

  return null;
}
