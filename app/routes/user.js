'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');
const bcrypt = require('bcrypt-as-promised');
const bcRounds = 12;

let defaultLocation;

util.knex('config').where('config', 'default').first()
  .then((config) => {
    defaultLocation = config.defaultLocation;
  });

/* Create new user */
router.post('/', (req, res, next) => {
  if (req.body.email && req.body.vemail &&
    req.body.password && req.body.vpassword &&
    req.body.firstname && req.body.lastname) {
    if (req.body.password !== req.body.vpassword) {
      const passwordError = new Error('Passwords do not match');
      passwordError.status = 500;
      next(passwordError);
    }
    else if (req.body.email !== req.body.vemail) {
      const emailError = new Error('Emails do not match');
      emailError.status = 500;
      next(emailError);
    }
    else {
      let userPass = '';
      /* All good, let's create a user */
      bcrypt.hash(req.body.password, bcRounds)
        .then((hashedPassword) => {
          userPass = hashedPassword;
        })
        .then(() => util.knex('drivers').insert({
          name: util.generateApocName(),
          location: defaultLocation
        }, '*'))
        .then(drivers => util.knex('users').insert({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          hashedPassword: userPass,
          driverid: drivers[0].id
        }, '*'))
        .then(users => util.knex('driver_visited').insert({
          locationid: defaultLocation,
          driverid: users[0].driverid
        }, '*'))
        .then(() => {
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        });
    }
  }
  else {
    const err = new Error('Registration missing required fields');
    err.status = 500;
    next(err);
  }
});

/* User account pages */
router.use(util.loginRequired);

router.get('/account', (req, res) => {
  util.renderTemplate(req, res, 'account');
});

/* Update user account information */
router.patch('/account', (req, res, next) => {
  if (req.body.firstname && req.body.lastname) {
    util.knex('users').where('email', req.session.user.email).first()
      .update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })
      .then(() => {
        util.knex('users').where('email', req.session.user.email).first()
          .then((user) => {
            req.session.user = user;
            req.flash('Name updated.');
            util.renderTemplate(req, res, 'account');
          });
      })
      .catch((error) => {
        next(error);
      });
  }
  else if (req.body.cpassword && req.body.password && req.body.vpassword) {
    util.knex('users').where('email', req.session.user.email).first().then((user) => {
      bcrypt.compare(req.body.cpassword, user.hashedPassword)
        .then(() => {
          bcrypt.hash(req.body.password, bcRounds)
            .then((hashedPassword) => {
              util.knex('users').where('email', req.session.user.email)
                .update({
                  hashedPassword
                })
                .then(() => {
                  req.session.user = user;
                  util.renderTemplate(req, res, 'account');
                });
            });
        })
        .catch(() => {
          req.flash('Password incorrect.');
          res.redirect('/user/account');
        });
    });
  }
  else {
    const err = new Error('Missing required fields');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
