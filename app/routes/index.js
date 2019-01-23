'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const User = require('../models/user');

/* GET home page with user, driver, and location info */
router.get('/', (req, res) => {
  if (req.session.user) {
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
router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
    .then((user) => {
      if (user) {
        /* Login successful, redirect to game page */
        req.session.user = user;
        delete req.session.hashedPassword;
        res.redirect('/game');
      }
      else {
        req.flash('Incorrect email or password.');
        util.renderTemplate(req, res, 'login');
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
