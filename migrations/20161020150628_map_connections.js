
exports.up = function(knex, Promise) {
  return knex.schema.createTable('city_link', (table) => {
    table.integer('city1').unsigned().references('cities.id').onDelete('CASCADE');
    table.integer('city2').unsigned().references('cities.id').onDelete('CASCADE');
    table.integer('distance').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('city_link');
};
