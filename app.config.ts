import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://dzc35632.apps.dynatrace.com',
  app: {
    name: 'evolane-entity-explorer',
    version: '0.0.0',
    description: 'An empty project',
    id: 'my.eu.evolane.entityexplorer',
    scopes: [{name: 'environment-api:entities:read', comment:'test'},{name: 'environment-api:metrics:read', comment: 'test'},{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
  server: { 
    enableCSP: false, 
  },
};

module.exports = config;

