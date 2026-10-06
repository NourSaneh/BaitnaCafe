import { config, fields, collection } from '@keystatic/core';

export default config({
  // Live site → Keystatic Cloud (saves to GitHub)
  // Your computer → local files (for testing)
  storage: import.meta.env.PROD
    ? { kind: 'cloud', pathPrefix: 'web' }
    : { kind: 'local' },

  cloud: {
    project: 'nour-saneh/baitnacafe',
  },

  ui: {
    brand: { name: 'Baitna Cafe' },
  },

  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: { label: 'Event title' },
        }),
        dateLabel: fields.text({
          label: 'Date',
          description: 'e.g. "Every day" or "Sunday 27 September"',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        image: fields.image({
          label: 'Photo',
          directory: 'src/assets/events',
          publicPath: '../../assets/events/',
          validation: { isRequired: true },
        }),
        bookingUrl: fields.url({
          label: 'Booking link (optional)',
          description: 'WhatsApp or booking page. Leave empty to hide the "Book Now" button.',
        }),
        endDate: fields.date({
          label: 'Hide after (optional)',
          description: 'The event disappears from the website after this date.',
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers show first.',
          defaultValue: 0,
        }),
      },
    }),
menu: collection({
  label: 'Menu highlights',
  slugField: 'name',
  path: 'src/content/menu/*',
  format: { data: 'yaml' },
  schema: {
    name: fields.slug({ name: { label: 'Item name' } }),
    category: fields.select({
      label: 'Category',
      options: [
        { label: 'Drinks', value: 'drinks' },
        { label: 'Desserts & Pastries', value: 'desserts' },
        { label: 'Sandwiches', value: 'sandwiches' },
      ],
      defaultValue: 'drinks',
    }),
    note: fields.text({
      label: 'Short description',
      description: 'One line, under 60 characters',
      validation: { length: { max: 60 } },
    }),
    image: fields.image({
      label: 'Photo',
      description: 'Square photo works best',
      directory: 'src/assets/menu',
      publicPath: '../../assets/menu/',
      validation: { isRequired: true },
    }),
    order: fields.integer({ label: 'Order (1 = first)', defaultValue: 1 }),
    visible: fields.checkbox({ label: 'Show on website', defaultValue: true }),
  },
}),
    

  },
});