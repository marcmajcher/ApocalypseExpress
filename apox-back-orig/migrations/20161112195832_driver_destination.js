'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('drivers', (table) => {
  table.integer('destination').unsigned().references('locations.id').defaultTo(null);
});

exports.down = knex => knex.schema.table('drivers', (table) => {
  table.dropColumn('destination');
});
