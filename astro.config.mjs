// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://jkartik.in',
  build: {
    // emit /blog/my-post/index.html so URLs keep a trailing slash
    format: 'directory',
  },
  // trailingSlash: 'always',
  markdown: {
    // syntax highlighting — warm, muted themes; token colours come through as
    // CSS variables so the code card keeps the site's own warm background.
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        // Real browser targets so Lightning CSS keeps modern standard properties
        // (e.g. unprefixed `backdrop-filter`) AND adds `-webkit-` where needed (Safari),
        // instead of pruning to just one and silently killing the blur in the build.
        // Modern targets so Lightning CSS keeps standard properties (like the unprefixed
        // `backdrop-filter`) in the build instead of pruning them for assumed-old browsers.
        targets: {
          chrome: 90 << 16,
          firefox: 110 << 16,
          safari: 16 << 16,
          edge: 90 << 16,
        },
      },
    },
  },
});
