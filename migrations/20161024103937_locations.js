
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('cities', 'locations');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('locations', 'cities');
};
