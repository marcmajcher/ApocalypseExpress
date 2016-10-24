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
      var err = new Error('Passwords do not match')
      err.status = 500;
      next(err);
    }
    else if (req.body.email !== req.body.vemail) {
      var err = new Error('Emails do not match')
      err.status = 500;
      next(err);
    }
    else {
      bcrypt.hash(req.body.password, 12)
        .then((hashed_password) => {
          return util.knex('users')
            .insert({
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              screenname: generateScreenName(),
              hashed_password: hashed_password
            }, '*');
        })
        .then((users) => {
          const user = users[0];
          delete user.hashed_password;
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        });
      }
    }
    else {
      var err = new Error('Registration missing required fields')
      err.status = 500;
      next(err);
    }
});

/* User account pages */
router.use(util.loginRequired);
router.get('/account', (req, res, next) => {
  util.renderTemplate(req, res, 'account')
});

module.exports = router;

//////

const nameList = require('../data/uniquenames');
function generateScreenName() {
  return nameList[Math.floor(Math.random()*nameList.length)] + ' ' + nameList[Math.floor(Math.random()*nameList.length)];
}
