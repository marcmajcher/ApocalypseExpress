'use strict';

/* eslint-env node */

const path = require('path');
require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_NAME,
    seeds: {
      directory: path.join(__dirname, '/seeds/dev')
    }
  },
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_NAME,
    seeds: {
      directory: path.join(__dirname, '/seeds/test')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: path.join(__dirname, '/seeds/dev')
    }
  }
};
