'use strict';

/* eslint-env node */

const config = require('../map_config');

exports.seed = knex => knex('locations').del()
  .then(() => knex('locations').insert(config.locations))
  .then(() => knex('connections').insert(config.connections));
