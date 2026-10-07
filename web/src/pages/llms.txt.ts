// /llms.txt — a plain-text summary for AI assistants (ChatGPT, Claude, Perplexity…).
// Built from the same menu and events the owner edits in Keystatic.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { business as b } from '../data/business';

export const prerender = true;

const categoryTitles = {
  drinks: 'Drinks',
  desserts: 'Desserts & pastries',
  sandwiches: 'Sandwiches',
  salads: 'Salads',
} as const;

export const GET: APIRoute = async ({ site }) => {
  const menu = (await getCollection('menu'))
    .filter(({ data }) => data.visible === true)
    .sort((x, y) => (x.data.order ?? 99) - (y.data.order ?? 99));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = (await getCollection('events'))
    .filter(({ data }) => data.visible !== false)
    .filter(({ data }) => !data.endDate || data.endDate >= today)
    .sort((x, y) => (x.data.order ?? 0) - (y.data.order ?? 0));

  const menuLines = Object.entries(categoryTitles).flatMap(([key, title]) => {
    const items = menu.filter(({ data }) => data.category === key);
    return items.length
      ? [`- ${title}: ${items.map(({ data }) => (data.note ? `${data.name} (${data.note})` : data.name)).join('; ')}`]
      : [];
  });

  const lines = [
    `# ${b.name} (${b.nameArabic})`,
    '',
    `> ${b.description}`,
    '',
    '## Visit',
    `- Address: ${b.address.street}, ${b.address.area}, ${b.address.city}, United Arab Emirates`,
    `- Opening hours: ${b.hoursLabel}`,
    `- Phone / WhatsApp: ${b.phoneLabel}`,
    `- [Google Maps](${b.mapUrl})`,
    '',
    '## Book a table',
    `- [Reservations](${b.reserveUrl})`,
    '',
    '## Menu',
    `- [Full menu](${b.menuUrl})`,
    ...menuLines,
    '',
    '## Order online',
    ...b.orderLinks.map((l) => `- [${l.label}](${l.href})`),
    ...(events.length
      ? ['', '## Events', ...events.map(({ data }) => `- ${data.title} (${data.dateLabel}): ${data.description.replace(/\s+/g, ' ').trim()}`)]
      : []),
    '',
    '## Follow',
    ...b.social.map((url) => `- ${url}`),
    '',
    '## Website',
    `- [Home](${new URL('/', site)})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
