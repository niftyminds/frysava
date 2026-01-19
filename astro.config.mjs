import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://frysava.cz', // Production domain
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false }, // Disabled - using GA4 instead
    imageService: true,               // Vercel Image Optimization
  }),
  integrations: [
    tailwind(),
    sitemap()
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
