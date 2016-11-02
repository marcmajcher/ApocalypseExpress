'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('config', (table) => {
  table.string('config');
  table.integer('defaultLocation').unsigned();
});

exports.down = knex => knex.schema.dropTable('config');
