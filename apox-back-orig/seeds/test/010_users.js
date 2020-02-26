'use strict';

/* eslint-env node */

const User = require('../../app/models/user');

const user1 = {
  email: 'test@gmail.com',
  firstname: 'Test',
  lastname: 'User',
  password: 'test'
};
const user2 = {
  email: 'admin@gmail.com',
  firstname: 'Admin',
  lastname: 'User',
  password: 'admin'
};

exports.seed = knex => Promise.all([
    knex('users').del(),
    knex('drivers').del(),
    knex('vehicles').del()
  ])
  .then(() => User.create(user1))
  .then(() => User.create(user2, true));
