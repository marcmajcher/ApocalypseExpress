'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('locations', (table) => {
  table.integer('population').notNullable().defaultTo(0);
  table.integer('tech').notNullable().defaultTo(0);
  table.integer('factionid').notNullable().defaultTo(0);
  table.enu('type', ['hold', 'freehold', 'camp', 'fort', 'compound', 'hardhold', 'enclave'])
    .defaultTo('hold');
});


exports.down = knex => knex.schema.table('locations', (table) => {
  table.dropColumn('population');
  table.dropColumn('tech');
  table.dropColumn('factionid');
  table.dropColumn('type');
});
