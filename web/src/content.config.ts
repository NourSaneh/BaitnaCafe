import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      dateLabel: z.string(),                // "Every day" or "Sunday 27 September"
      description: z.string(),
      image: image(),
      bookingUrl: z.string().nullish(),     // optional
      endDate: z.coerce.date().nullish(),   // optional: hide after this date
      order: z.number().nullish(),          // optional: lower = shows first
      visible: z.boolean().optional(),
    }),
});

const menu = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/menu' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      category: z.enum(['drinks', 'desserts', 'sandwiches', 'salads']),
      note: z.string().optional(),
      image: image(),
      order: z.number().nullable().optional(),
      visible: z.boolean().optional(),
    }),
});

export const collections = { events, menu };