'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('connections', (table) => {
  table.renameColumn('city1', 'loc1');
  table.renameColumn('city2', 'loc2');
});

exports.down = knex => knex.schema.table('connections', (table) => {
  table.renameColumn('loc1', 'city1');
  table.renameColumn('loc2', 'city2');
});
