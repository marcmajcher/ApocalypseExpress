'use strict';
require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_NAME
  },
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_NAME,
    seeds: { directory: __dirname + '/seeds/test' }
  },
  production: {
    client: 'pg',
    connection: process.env.PRODUCTION_DATABASE_URL,
    seeds: { directory: __dirname + '/seeds/production' }
  }
};
