'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('users', (table) => {
  table.integer('driverid').unsigned().references('drivers.id').onDelete('CASCADE');
});

exports.down = knex => knex.schema.table('users', (table) => {
  table.dropColumn('driverid');
});
