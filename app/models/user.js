'use strict';

/* eslint-env node */

const util = require('../_util');
const bcrypt = require('bcrypt-as-promised');
const bcRounds = 12;

let defaultLocation = 1;

util.knex('config').where('config', 'default').first()
  .then((config) => {
    defaultLocation = config.defaultLocation;
  });

exports.get = email => util.knex('users').where('email', email).first();

/* Create a new user with the provided info and return a promise */
exports.create = (userInfo) => {
  let hashedPassword = '';

  return bcrypt.hash(userInfo.password, bcRounds)
    .then((digest) => {
      hashedPassword = digest;
    })
    .then(() => util.knex('drivers').insert({
      name: util.generateApocName(),
      location: defaultLocation
    }, '*'))
    .then(drivers => util.knex('users').insert({
      email: userInfo.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      hashedPassword,
      driverid: drivers[0].id
    }, '*'))
    .then(users => util.knex('driver_visited').insert({
      locationid: defaultLocation,
      driverid: users[0].driverid
    }, '*'));
};

/* Update a user with the given data */
exports.update = (email, data) =>
  util.knex('users').where('email', email).first()
  .update({
    firstname: data.firstname,
    lastname: data.lastname,
  });


/* Update a user's password */
exports.updatePassword = (email, currentPassword, newPassword) =>
  util.knex('users').where('email', email).first()
  .then(user => bcrypt.compare(currentPassword, user.hashedPassword))
  .then(() => bcrypt.hash(newPassword, bcRounds))
  .then(hashedPassword => util.knex('users').where('email', email)
    .update({
      hashedPassword
    }));
// authenticate
