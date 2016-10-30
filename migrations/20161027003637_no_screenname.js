exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('screenname');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('screenname').notNullable().defaultTo('');
  });

};
