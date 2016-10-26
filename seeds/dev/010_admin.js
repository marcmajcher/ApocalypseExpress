'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'majcher@gmail.com',
          firstname: 'Marc',
          lastname: 'Majcher',
          screenname: 'Nick Fitts',
          hashed_password: '$2a$12$Qs2FsKTK1tsaXGO/wc0YVOTI/doAPALiFWacy/Uku4NOShVopeGQm',
          role: 'admin'})
      ]);
    });
};
