# Baitna Cafe website

One-page site for Baitna Cafe, a rooftop café in Al Mamzar, Sharjah. Built with Astro and Tailwind, deployed on Vercel.

## Editing content

The owner edits events and menu highlights at `/admin` (Keystatic). Saves go to GitHub and Vercel redeploys automatically.

- Events: `src/content/events/` — set "Hide after" so an event disappears once it's over (it is removed on the next deploy)
- Menu highlights: `src/content/menu/`
- Café details used in the page head and 404 page: `src/data/business.ts`

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
```
