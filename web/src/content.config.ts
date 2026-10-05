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
    }),
});

export const collections = { events };