'use strict';

exports.seed = function(knex, Promise) {
  return knex('config').del()
    .then(function () {
        return knex('config').insert({
          config: 'default',
          defaultLocation: 0
        });
    });
};
