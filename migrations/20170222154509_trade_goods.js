'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('tradegoods', (table) => {
  table.increments();
  table.string('name').unique().notNullable();
  table.integer('mintech').unsigned().notNullable();
  table.integer('price').unsigned().notNullable();
  table.integer('rarity').unsigned().notNullable();
});

exports.down = knex => knex.schema.dropTable('tradegoods');
