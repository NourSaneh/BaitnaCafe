// @ts-check
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';   

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
    },

integrations: [react(), keystatic()],  
adapter: vercel(),
 image: {
       domains: ['drivu.s3.eu-west-1.amazonaws.com'],
     },
});