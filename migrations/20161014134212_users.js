'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('email').unique().notNullable();
  table.specificType('hashedPassword', 'char(60)').notNullable();
  table.enu('role', ['player', 'admin']).defaultTo('player');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
