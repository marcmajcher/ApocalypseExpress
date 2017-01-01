'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');
const bcrypt = require('bcrypt-as-promised');

// TODO: move db stuff to models

/* GET home page with user, driver, and location info */
router.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.redirect('/game');
  }
  else {
    util.renderTemplate(req, res, 'index');
  }
});

/* User registration page */
router.get('/register', (req, res) => {
  /* If the user is already logged in, redirect them to game page */
  if (req.session.user) {
    res.redirect('/game');
  }
  else {
    util.renderTemplate(req, res, 'register');
  }
});

/* Login page  */
router.get('/login', (req, res) => {
  util.renderTemplate(req, res, 'login');
});

/* Log user in and redirect them to the game page */
router.post('/login', (req, res, next) => {
  util.knex('users').where({
    email: req.body.email
  }).first().then((user) => {
    if (!user || !req.body.password) {
      /* Fail if the username is bad, or no password is given */
      req.flash('Incorrect email or password.');
      util.renderTemplate(req, res, 'login');
    }
    else {
      bcrypt.compare(req.body.password, user.hashedPassword)
        .then(() => {
          /* Login successful, redirect to game page */
          req.session.user = user;
          delete req.session.hashedPassword;
          res.redirect('/game');
        })
        .catch(bcrypt.MISMATCH_ERROR, () => {
          /* Password is incorrect */
          req.flash('Incorrect email or password.');
          util.renderTemplate(req, res, 'login');
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

/* Log player out and return them to the index page */
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

/* smoke test route */
router.get('/booyah', (req, res) => {
  res.send('booyah');
});

module.exports = router;
