'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('cities', (table) => {
  table.increments();
  table.string('name').unique().notNullable();
  table.float('latitude').notNullable();
  table.float('longitude').notNullable();
});

exports.down = knex => knex.schema.dropTable('cities');
