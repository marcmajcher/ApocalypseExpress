'use strict';

/* eslint-env node */

const defaultMoney = 0;
const defaultHealth = 100;

exports.up = knex => knex.schema.createTable('drivers', (table) => {
  table.increments();
  table.timestamps(true, true);
  table.string('name').notNullable();
  table.integer('location').unsigned().references('locations.id').onDelete('CASCADE');
  table.integer('money').unsigned().notNullable().defaultTo(defaultMoney);
  table.integer('health').unsigned().notNullable().defaultTo(defaultHealth);
});

exports.down = knex => knex.schema.dropTable('drivers');
