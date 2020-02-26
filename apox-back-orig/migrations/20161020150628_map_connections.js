'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('city_link', (table) => {
  table.integer('city1').unsigned().references('cities.id').onDelete('CASCADE');
  table.integer('city2').unsigned().references('cities.id').onDelete('CASCADE');
  table.integer('distance').unsigned();
});

exports.down = knex => knex.schema.dropTable('city_link');
