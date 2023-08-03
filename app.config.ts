import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://dzc35632.live.dynatrace.com/',
  app: {
    name: 'booking-analytics',
    version: '0.0.0',
    description: 'An empty project',
    id: 'my.booking.analytics',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
};

module.exports = config;