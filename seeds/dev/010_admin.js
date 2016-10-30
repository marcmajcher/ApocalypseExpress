'use strict';

var driverName = 'Nick Fitts';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return knex('drivers').insert({
        name: driverName,
        location: 1
      });
    })
    .then(function() {
      return knex('drivers').where('name', driverName).first().then((driver) => {
        return knex('users').insert({
          email: 'majcher@gmail.com',
          firstname: 'Marc',
          lastname: 'Majcher',
          hashed_password: '$2a$12$Qs2FsKTK1tsaXGO/wc0YVOTI/doAPALiFWacy/Uku4NOShVopeGQm',
          role: 'admin',
          driverid: driver.id
        });
      });
    });
};
