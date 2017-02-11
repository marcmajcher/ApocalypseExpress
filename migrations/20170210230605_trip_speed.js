'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('trips', (table) => {
  table.integer('speed').unsigned().defaultTo(0);
});

exports.down = knex => knex.schema.table('trips', (table) => {
  table.dropColumn('speed');
});
