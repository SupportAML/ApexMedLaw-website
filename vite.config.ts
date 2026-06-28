import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // react-helmet-async is CJS — bundle it so the SSR ESM build can import its named exports.
    noExternal: ['react-helmet-async', 'gsap', /^gsap\//],
  },
  // Client-only vendor splitting. Guarded by `!isSsrBuild` so the SSR bundle
  // (dist-ssr/entry-server.js, consumed by scripts/prerender.ts) stays a single
  // entry and the prerender pipeline is untouched. Splitting the large vendor
  // libraries into separate, long-cacheable chunks reduces the main app chunk
  // below the 500 KB warning threshold and lets the browser fetch them in parallel.
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            manualChunks(id: string) {
              if (!id.includes('node_modules')) return;
              if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
                return 'react-vendor';
              }
              if (/[\\/]node_modules[\\/](gsap|@gsap)[\\/]/.test(id)) {
                return 'gsap';
              }
              if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/lucide-react')) {
                return 'ui-vendor';
              }
            },
          },
        },
      },
}));
