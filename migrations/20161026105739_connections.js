'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.renameTable('city_link', 'connections');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('connections', 'city_link');
};
