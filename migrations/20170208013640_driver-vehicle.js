'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('drivers', (table) => {
  table.integer('vehicleid').unsigned().references('vehicles.id').onDelete('CASCADE');
});

exports.down = knex => knex.schema.table('drivers', (table) => {
  table.dropColumn('vehicleid');
});
