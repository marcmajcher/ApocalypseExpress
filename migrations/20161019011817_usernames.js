'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('screenname').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('firstname');
    table.dropColumn('lastname');
    table.dropColumn('screenname');
  });
};
