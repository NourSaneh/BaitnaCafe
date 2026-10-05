import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

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
  },
});