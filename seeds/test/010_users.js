'use strict';

/* eslint-env node */

const User = require('../../app/models/user');

const user1 = {
  email: 'admin@gmail.com',
  firstname: 'Admin',
  lastname: 'User',
  password: 'admin'
};
const user2 = {
  email: 'test@gmail.com',
  firstname: 'Test',
  lastname: 'User',
  password: 'test'
};

exports.seed = knex => knex('users').del()
  .then(() => User.create(user1, true))
  .then(() => User.create(user2));
