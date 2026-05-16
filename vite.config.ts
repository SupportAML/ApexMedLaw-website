import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: '/',
  plugins: [
    // The kimi inspect attribute plugin stamps every JSX element with a
    // `code-path` attribute. That's helpful in dev (links elements back to
    // source) but pollutes production HTML with hundreds of attributes per
    // page — bad for both bundle size and SEO. Gate it to dev only.
    ...(command === 'serve' || mode === 'development' ? [inspectAttr()] : []),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('recharts') || id.includes('d3-')) return 'charts';
            if (id.includes('embla-carousel') || id.includes('react-day-picker')) return 'misc-ui';
            if (id.includes('react-router') || id.includes('react-helmet')) return 'router';
            if (id.includes('react-dom') || id.includes('scheduler') || id.match(/[\\/]react[\\/]/)) return 'react';
          }
          return undefined;
        },
      },
    },
  },
}));
