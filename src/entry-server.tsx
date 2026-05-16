/* eslint-disable react-refresh/only-export-components */
// SSR-only entry — never hot-reloaded.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';

export { buildRoutes, SITE_URL } from './lib/routes';
export type { RouteEntry, ChangeFreq, RoutePriority } from './lib/routes';

export interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet as HelmetServerState };
}
