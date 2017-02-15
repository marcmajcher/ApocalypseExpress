'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('config', (table) => {
  table.integer('defaultDriverMoney').unsigned().defaultTo(0);
});

exports.down = knex => knex.schema.table('config', (table) => {
  table.dropColumn('defaultDriverMoney');
});
