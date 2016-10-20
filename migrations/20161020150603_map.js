
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
