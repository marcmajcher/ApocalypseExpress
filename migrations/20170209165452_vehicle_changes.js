'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('vehicles', (table) => {
  table.renameColumn('mpg', 'kmpl');
  table.string('name');
  table.dropColumn('armorf');
  table.dropColumn('armorr');
  table.dropColumn('armorb');
  table.dropColumn('armorl');
  table.integer('armor').unsigned().notNullable();
});

exports.down = knex => knex.schema.table('vehicles', (table) => {
  table.renameColumn('kmpl', 'mpg');
  table.dropColumn('name');
  table.integer('armorf').unsigned();
  table.integer('armorr').unsigned();
  table.integer('armorb').unsigned();
  table.integer('armorl').unsigned();
  table.dropColumn('armor');
});
