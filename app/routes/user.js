'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const User = require('../models/user');

/* Create new user */
router.post('/', (req, res, next) => {
  // TODO: add verification with Joi
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
      User.create(req.body)
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
    User.update(req.session.user.email, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })
      .then(() => {
        req.session.user.firstname = req.body.firstname;
        req.session.user.lastname = req.body.lastname;
        req.flash('Name updated.');
        util.renderTemplate(req, res, 'account');
      })
      .catch((error) => {
        next(error);
      });
  }
  else if (req.body.cpassword && req.body.password && req.body.vpassword) {
    // TODO: validate all this stuff wit Joi
    User.updatePassword(req.session.user.email, req.body.cpassword, req.body.password)
      .then(() => {
        req.flash('Password updated.');
        util.renderTemplate(req, res, 'account');
      })
      .catch(() => {
        req.flash('Password incorrect.');
        res.redirect('/user/account');
      });
  }
  else {
    const err = new Error('Missing required fields');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
