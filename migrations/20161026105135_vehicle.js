'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('vehicles', (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string('model').notNullable();
    table.string('size').notNullable();
    table.string('type').notNullable();
    table.integer('cargocap').unsigned().notNullable();
    table.integer('passengercap').unsigned().notNullable();
    table.integer('fuelcap').unsigned().notNullable();
    table.integer('mpg').unsigned().notNullable();
    table.integer('price').unsigned().notNullable();
    table.integer('topspeed').unsigned().notNullable();
    table.integer('armorf').unsigned().notNullable();
    table.integer('armorr').unsigned().notNullable();
    table.integer('armorb').unsigned().notNullable();
    table.integer('armorl').unsigned().notNullable();
    table.string('tires').notNullable().defaultTo('');
    table.string('engine').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vehicles');
};
