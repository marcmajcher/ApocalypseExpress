'use strict';

/* eslint-env node */

const User = require('../../app/models/user');
const Driver = require('../../app/models/driver');

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

exports.seed = knex => knex('users').del()
  .then(() => User.create(user1))
  .then(() => User.create(user2, true))
  .then(() => Driver.updateValue(1, 'name', 'Toecutter'));
