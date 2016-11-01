'use strict';

exports.seed = function(knex) {
  return knex('config').del()
    .then(function() {
      return knex('config').insert({
        config: 'default',
        defaultLocation: 0
      });
    });
};
