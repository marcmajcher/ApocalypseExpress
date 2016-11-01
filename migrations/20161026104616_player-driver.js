'use strict';

exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.integer('driverid').unsigned().references('drivers.id').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('driverid');
  });
};
