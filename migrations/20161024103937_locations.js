'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.renameTable('cities', 'locations');
exports.down = knex => knex.schema.renameTable('locations', 'cities');
