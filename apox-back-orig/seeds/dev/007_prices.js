'use strict';

/* eslint-env node */

const config = require('../../app/data/tradegoods');

exports.seed = knex => knex('tradegoods').del()
  .then(() => knex('tradegoods').insert(config));
