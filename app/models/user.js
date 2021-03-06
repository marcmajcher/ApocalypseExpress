'use strict';

/* eslint-env node */

const util = require('../_util');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Driver = require('./driver');
const Vehicle = require('./vehicle');
const names = require('../data/uniquenames.js');

const userDb = 'users';
const bcRounds = 12;
const nameMax = 60;
const passMin = 8;
const passMax = 64;

exports.createSchema = Joi.object().keys({
  email: Joi.string().email().valid(Joi.ref('vemail'))
    .required(),
  vemail: Joi.string().email().required(),
  firstname: Joi.string().max(nameMax).required(),
  lastname: Joi.string().max(nameMax).required(),
  password: Joi.string().max(passMax).min(passMin).valid(Joi.ref('vpassword'))
    .required(),
  vpassword: Joi.string().required(),
});

exports.updateSchema = Joi.object().keys({
  firstname: Joi.string().max(nameMax).required(),
  lastname: Joi.string().max(nameMax).required()
});

exports.updatePasswordSchema = Joi.object().keys({
  cpassword: Joi.string().required(),
  password: Joi.string().max(passMax).min(passMin).valid(Joi.ref('vpassword'))
    .required(),
  vpassword: Joi.string().required()
});

/* Get a user with given email/id */
exports.get = email => util.knex(userDb).where('email', email).first();

/* Create a new user with the provided info and return a promise */
exports.create = (userInfo, isAdmin = false) => {
  let hashedPassword = '';
  let config;
  userInfo.role = isAdmin ? 'admin' : 'player';

  return bcrypt.hash(userInfo.password, bcRounds)
    .then((digest) => {
      hashedPassword = digest;
    })
    .then(() => util.knex('config').where('config', 'default').first())
    .then((defaultConfig) => {
      config = defaultConfig;
      return Vehicle.createDefault();
    })
    .then(vehicles => Driver.create({
      name: names.generateApocName(),
      location: config.defaultLocation,
      money: config.defaultDriverMoney,
      vehicleid: vehicles[0].id
    }, '*'))
    .then(drivers => util.knex(userDb).insert({
      email: userInfo.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      role: userInfo.role,
      hashedPassword,
      driverid: drivers[0].id
    }, '*'))
    .then(users => util.knex('driver_visited').insert({
      locationid: config.defaultLocation,
      driverid: users[0].driverid
    }, '*'));
};

/* Update a user with the given data */
exports.update = (email, data) =>
  util.knex(userDb).where('email', email).first()
  .update({
    firstname: data.firstname,
    lastname: data.lastname,
  });

/* Update a user's password */
exports.updatePassword = (email, currentPassword, newPassword) =>
  util.knex(userDb).where('email', email).first()
  .then(user => bcrypt.compare(currentPassword, user.hashedPassword))
  .then(match => (match ? bcrypt.hash(newPassword, bcRounds)
    : Promise.reject(new Error('password mismatch'))))
  .then(hashedPassword => util.knex(userDb).where('email', email)
    .update({
      hashedPassword
    }));

/* Authenticate a user with given email and password */
exports.authenticate = (email, password) =>
  util.knex(userDb).where('email', email).first()
  .then(user =>
      bcrypt.compare(password, user.hashedPassword)
      .then(() => new Promise(resolve => resolve(user)))
  );
