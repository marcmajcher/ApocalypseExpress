'use strict';

/* eslint-env node */

exports.seed = (knex, Promise) =>
  knex('users').del()
  .then(() =>
    knex('drivers').insert({
      name: 'Toecutter',
      location: 1
    })
  )
  .then(() => Promise.all([
    knex('users').insert([{
      email: 'admin@gmail.com',
      firstname: 'Admin',
      lastname: 'User',
      driverid: 1,
      hashedPassword: '$2a$12$Qs2FsKTK1tsaXGO/wc0YVOTI/doAPALiFWacy/Uku4NOShVopeGQm',
      role: 'admin'
    }, {
      email: 'test@gmail.com',
      firstname: 'Test',
      lastname: 'User',
      driverid: 1,
      hashedPassword: '$2a$12$JgZVSmqm8/DGpi3kV3ODKefDw7ajkvpqlp8Qg1VpDaCUZBgm9E4Gu'
    }])
  ]));
