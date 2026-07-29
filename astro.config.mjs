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
});
