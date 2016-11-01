'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('config', (table) => {
    table.string('config');
    table.integer('defaultLocation').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('config');
};
