import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
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
});
