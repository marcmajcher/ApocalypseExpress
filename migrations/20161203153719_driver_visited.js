'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('driver_visited', (table) => {
  table.integer('locationid').unsigned().notNullable().references('locations.id');
  table.integer('driverid').unsigned().notNullable().references('drivers.id');
});

exports.down = knex => knex.schema.dropTable('driver_visited');
