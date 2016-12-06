'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('connections', (table) => {
  table.renameColumn('loc1', 'start');
  table.renameColumn('loc2', 'end');
});

exports.down = knex => knex.schema.table('connections', (table) => {
  table.renameColumn('start', 'loc1');
  table.renameColumn('end', 'loc2');
});
