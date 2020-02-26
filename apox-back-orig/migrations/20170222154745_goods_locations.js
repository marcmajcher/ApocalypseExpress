'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('location_goods', (table) => {
  table.integer('locationid').unsigned().notNullable().references('locations.id');
  table.integer('goodid').unsigned().notNullable().references('tradegoods.id');
  table.integer('price').unsigned().notNullable();
  table.integer('stock').unsigned().notNullable();
  table.integer('capacity').unsigned().notNullable();
  table.integer('demand').unsigned().notNullable();
  table.integer('production').unsigned().notNullable();
  table.float('modifier').notNullable();
});

exports.down = knex => knex.schema.dropTable('location_goods');
