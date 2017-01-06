'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('trips', (table) => {
  table.renameColumn('locationid', 'destinationid');
  table.integer('startid').unsigned().notNullable().references('locations.id');
  table.integer('progress').unsigned().notNullable().defaultTo(0);
});

exports.down = knex => knex.schema.table('trips', (table) => {
  table.renameColumn('destinationid', 'locationid');
  table.dropColumn('startid');
  table.dropColumn('progress');
});
