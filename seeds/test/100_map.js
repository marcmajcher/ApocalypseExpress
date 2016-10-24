
exports.seed = function(knex, Promise) {
  return knex('locations').del()
    .then(function () {
      return Promise.all([
        /* insert locations */
        knex('locations').insert({name: 'Garnet', latitude: '32.4487364', longitude: '-99.7331439'}),
        knex('locations').insert({name: 'Amethyst', latitude: '32.5264993', longitude: '-101.71597'}),
        knex('locations').insert({name: 'Pearl', latitude: '27.7522487', longitude: '-98.0697249'})
      ]);
    })
    .then(function() {
      return Promise.all([
          knex(knex.raw('locations c1, locations c2'))
            .select('c1.id as city1', 'c2.id as city2')
            .whereRaw("?? = 'Amethyst' and ?? = 'Garnet'", ['c1.name', 'c2.name'])
            .first()
            .then((thingy) => {
              thingy.distance = 97154;
              return knex('city_link').insert(thingy);
            }),
          knex(knex.raw('locations c1, locations c2'))
            .select('c1.id as city1', 'c2.id as city2')
            .whereRaw("?? = 'Garnet' and ?? = 'Pearl'", ['c1.name', 'c2.name'])
            .first()
            .then((thingy) => {
              thingy.distance = 94887;
              return knex('city_link').insert(thingy);
            }),
          knex(knex.raw('locations c1, locations c2'))
            .select('c1.id as city1', 'c2.id as city2')
            .whereRaw("?? = 'Pearl' and ?? = 'Amethyst'", ['c1.name', 'c2.name'])
            .first()
            .then((thingy) => {
              thingy.distance = 72787;
              return knex('city_link').insert(thingy);
          }),
        ]);
    });
};
