// @ts-check
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://baitna-cafe-pied.vercel.app', // change to the real domain later

  integrations: [
    react(),
    keystatic(),
    // Keep the editor out of Google
    sitemap({ filter: (page) => !/\/(keystatic|admin)(\/|$)/.test(page) }),
  ],
  adapter: vercel(),

  // Easy address for the owner: /admin → /keystatic
  redirects: {
    '/admin': '/keystatic',
  },

  image: {
    domains: ['drivu.s3.eu-west-1.amazonaws.com'],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});