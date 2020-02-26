'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('trips', (table) => {
  table.integer('locationid').unsigned().notNullable().references('locations.id');
  table.integer('driverid').unsigned().notNullable().references('drivers.id');
  table.integer('sequence').unsigned().notNullable().defaultTo(1);
});

exports.down = knex => knex.schema.dropTable('trips');
