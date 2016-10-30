'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.string('description').notNullable().defaultTo('This is a location.');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.dropColumn('description');
  });
};
