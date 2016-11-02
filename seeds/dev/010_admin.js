'use strict';

/* eslint-env node */

const driverName = 'Nick Fitts';

exports.seed = knex => knex('users').del()
  .then(() => knex('drivers').insert({
    name: driverName,
    location: 1
  }))
  .then(() => knex('drivers').where('name', driverName).first()
    .then(driver => knex('users').insert({
      email: 'majcher@gmail.com',
      firstname: 'Marc',
      lastname: 'Majcher',
      hashedPassword: '$2a$12$Qs2FsKTK1tsaXGO/wc0YVOTI/doAPALiFWacy/Uku4NOShVopeGQm',
      role: 'admin',
      driverid: driver.id
    })));
