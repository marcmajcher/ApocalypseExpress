'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('trips', (table) => {
  table.boolean('underway').notNullable().defaultTo(false);
});

exports.down = knex => knex.schema.table('trips', (table) => {
  table.dropColumn('underway');
});
