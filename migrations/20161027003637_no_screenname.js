'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.table('users', (table) => {
  table.dropColumn('screenname');
});

exports.down = knex => knex.schema.table('users', (table) => {
  table.string('screenname').notNullable().defaultTo('');
});
