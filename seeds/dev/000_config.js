'use strict';

/* eslint-env node */

exports.seed = knex => knex('config').del()
  .then(() => knex('config').insert({
    config: 'default',
    defaultLocation: 0
  }));
