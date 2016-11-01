'use strict';

exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('screenname');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.string('screenname').notNullable().defaultTo('');
  });

};
