'use strict';

/* eslint-env node */

const User = require('../../app/models/user');

const user1 = {
  email: 'majcher@gmail.com',
  password: 'test',
  firstname: 'Marc',
  lastname: 'Majcher'
};
const user2 = {
  email: 'nickfitts@gmail.com',
  password: 'test',
  firstname: 'Nick',
  lastname: 'Fitts'
};

exports.seed = knex => knex('users').del()
  .then(() => User.create(user1, true))
  .then(() => User.create(user2));
