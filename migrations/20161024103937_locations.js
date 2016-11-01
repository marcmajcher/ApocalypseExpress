'use strict';

exports.up = function(knex) {
  return knex.schema.renameTable('cities', 'locations');
};

exports.down = function(knex) {
  return knex.schema.renameTable('locations', 'cities');
};
