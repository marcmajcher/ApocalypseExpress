'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('drivers', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.integer('location').unsigned().references('locations.id').onDelete('CASCADE');
    table.integer('money').unsigned().notNullable().defaultTo(0);
    table.integer('health').unsigned().notNullable().defaultTo(100);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drivers');
};
