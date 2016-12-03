'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('trips', (table) => {
  table.integer('distance').unsigned().notNullable();
});

exports.down = knex => knex.schema.table('trips', (table) => {
  table.dropColumn('distance');
});
