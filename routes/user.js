'use strict';

const express = require('express');
const router = express.Router();
const util = require('../util/route_utils');
const bcrypt = require('bcrypt-as-promised');

/* Create new user */
router.post('/', (req, res, next) => {
  if (req.body.email && req.body.vemail &&
    req.body.password && req.body.vpassword &&
    req.body.firstname && req.body.lastname) {
    if (req.body.password !== req.body.vpassword) {
      var passwordError = new Error('Passwords do not match');
      passwordError.status = 500;
      next(passwordError);
    }
    else if (req.body.email !== req.body.vemail) {
      var emailError = new Error('Emails do not match');
      emailError.status = 500;
      next(emailError);
    }
    else {
      let user_password = '';
      /* All good, let's create a user */
      bcrypt.hash(req.body.password, 12)
        .then((hashed_password) => {
          user_password = hashed_password;
          return util.knex('config').where('config', 'default').first();
        })
        .then((config) => {
          return util.knex('drivers').insert({
            name: generateApocName(),
            location: config.defaultLocation
          }, '*');
        })
        .then((drivers) => {
          return util.knex('users').insert({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            hashed_password: user_password,
            driverid: drivers[0].id
          }, '*');
        })
        .then((user) => {
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        });
    }
  }
  else {
    var err = new Error('Registration missing required fields');
    err.status = 500;
    next(err);
  }
});

/* User account pages */
router.use(util.loginRequired);
router.get('/account', (req, res, next) => {
  util.renderTemplate(req, res, 'account');
});

router.put('/account', (req, res, next) => {
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
      });
  }
  else if (req.body.cpassword && req.body.password && req.body.vpassword) {
    util.knex('users').where('email', req.session.user.email).first().then(
      (user) => {
        bcrypt.compare(req.body.cpassword, user.hashed_password)
          .then(() => {
            bcrypt.hash(req.body.password, 12)
              .then((hashed_password) => {
                util.knex('users').where('email', req.session.user.email)
                  .update({
                    hashed_password: hashed_password
                  })
                  .then(() => {
                    util.knex('users').where('email', req.session.user
                      .email).first().then((user) => {
                      req.session.user = user;
                      util.renderTemplate(req, res, 'account');
                    });
                  });
              });
          })
          .catch((err) => {
            req.flash('Password incorrect.');
            res.redirect('/user/account');
          });
      });
  }
  else {
    var err = new Error('Missing required fields');
    err.status = 500;
    next(err);
  }
});

module.exports = router;

//////

const nameList = require('../data/uniquenames');

function generateApocName() {
  return nameList[Math.floor(Math.random() * nameList.length)] + ' ' + nameList[
    Math.floor(Math.random() * nameList.length)];
}
