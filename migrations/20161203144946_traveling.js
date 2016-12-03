'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('drivers', (table) => {
  table.boolean('traveling').defaultTo(false);
});

exports.down = knex => knex.schema.table('drivers', (table) => {
  table.dropColumn('destination');
});
