'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('users', (table) => {
  table.string('firstname').notNullable();
  table.string('lastname').notNullable();
  table.string('screenname').notNullable();
});

exports.down = knex => knex.schema.table('users', (table) => {
  table.dropColumn('firstname');
  table.dropColumn('lastname');
  table.dropColumn('screenname');
});
