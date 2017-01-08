'use strict';

/* eslint-env node */

const defaultDifficulty = 10;

exports.up = knex => knex.schema.table('connections', (table) => {
  table.integer('difficulty').unsigned().notNullable().defaultTo(defaultDifficulty);
});

exports.down = knex => knex.schema.table('trips', (table) => {
  table.dropColumn('difficulty');
});
