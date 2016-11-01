'use strict';

exports.up = function(knex) {
  return knex.schema.table('locations', (table) => {
    table.string('description').notNullable().defaultTo('This is a location.');
  });
};

exports.down = function(knex) {
  return knex.schema.table('locations', (table) => {
    table.dropColumn('description');
  });
};
