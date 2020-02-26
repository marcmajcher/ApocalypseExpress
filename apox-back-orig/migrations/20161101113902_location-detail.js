'use strict';

/* eslint-env node */

const defaultPopulation = 1000;
const defaultTechLevel = 5;

exports.up = knex => knex.schema.table('locations', (table) => {
  table.integer('population').unsigned().notNullable().defaultTo(defaultPopulation);
  table.integer('tech').unsigned().notNullable().defaultTo(defaultTechLevel);
  table.integer('factionid').unsigned().notNullable().defaultTo(0);
  table.enu('type', ['hold', 'freehold', 'camp', 'fort', 'compound', 'hardhold', 'enclave'])
    .defaultTo('hold');
});


exports.down = knex => knex.schema.table('locations', (table) => {
  table.dropColumn('population');
  table.dropColumn('tech');
  table.dropColumn('factionid');
  table.dropColumn('type');
});
