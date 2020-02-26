'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('locations', (table) => {
  table.text('description').notNullable().defaultTo('This is a location.');
});

exports.down = knex => knex.schema.table('locations', (table) => {
  table.dropColumn('description');
});
