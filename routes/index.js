'use strict';

const express = require('express');
const router = express.Router();
const util = require('../util/route_utils');
const bcrypt = require('bcrypt-as-promised');

/* GET home page. */
router.get('/', (req, res, next) => {
  util.renderTemplate(req, res, 'index');
});

router.get('/booyah', (req, res) => {
  res.send('booyah');
});

/* User registration page */
router.get('/register', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  }
  else {
    util.renderTemplate(req, res, 'register');
  }
});

/* Log in/out */
router.get('/login', (req, res) => {
  util.renderTemplate(req, res, 'login');
})

router.post('/login', (req, res, next) => {
  util.knex('users').where({email: req.body.email}).first().then((user) => {
    if (!user || !req.body.password) {
      req.flash('Incorrect email or password.');
      util.renderTemplate(req, res, 'login');
    }
    else {
      bcrypt.compare(req.body.password, user.hashed_password)
        .then(() => {
          req.session.user = user;
          delete req.session.hashed_password;
          res.redirect('/');
        })
        .catch(bcrypt.MISMATCH_ERROR, (err) => {
          req.flash('Incorrect email or password.');
          util.renderTemplate(req, res, 'login');
        })
        .catch((err) => {
          next(err);
        });
      }
    });
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

module.exports = router;
