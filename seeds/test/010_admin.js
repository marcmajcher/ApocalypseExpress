'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return knex('drivers').insert({
        name: 'driverName',
        location: 1
      });
    })
    .then(function() {
      return Promise.all([
        knex('users').insert([{
          email: 'admin@gmail.com',
          firstname: 'Admin',
          lastname: 'User',
          driverid: 1,
          hashed_password: '$2a$12$Qs2FsKTK1tsaXGO/wc0YVOTI/doAPALiFWacy/Uku4NOShVopeGQm',
          role: 'admin'
        }, {
          email: 'test@gmail.com',
          firstname: 'Test',
          lastname: 'User',
          driverid: 1,
          hashed_password: '$2a$12$JgZVSmqm8/DGpi3kV3ODKefDw7ajkvpqlp8Qg1VpDaCUZBgm9E4Gu'
        }, ])
      ]);
    });
};
