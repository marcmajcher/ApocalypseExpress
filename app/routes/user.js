'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Joi = require('joi');
const User = require('../models/user');

/* Create new user */
router.post('/', (req, res, next) => {
  Joi.validate(req.body, User.createSchema, (err) => {
    if (err) {
      err.status = 500;
      next(err);
    }
    else {
      User.create(req.body)
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          next(error);
        });
    }
  });
});

/* User account pages */
router.use(util.loginRequired);

/* Return basic user info */
router.get('/', (req, res) => {
  res.send({
    firstname: req.session.user.firstname,
    lastname: req.session.user.lastname,
    email: req.session.user.email
  });
});

/* Update user account information */
router.patch('/account', (req, res, next) => {
  if (req.body.firstname && req.body.lastname) {
    Joi.validate(req.body, User.updateSchema, (err) => {
      if (err) {
        err.status = 500;
        next(err);
      }
      else {
        User.update(req.session.user.email, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          })
          .then(() => {
            req.session.user.firstname = req.body.firstname;
            req.session.user.lastname = req.body.lastname;
            res.send({
              ok: true
            });
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
  else if (req.body.cpassword && req.body.password && req.body.vpassword) {
    Joi.validate(req.body, User.updatePasswordSchema, (err) => {
      if (err) {
        err.status = 500;
        next(err);
      }
      else {
        User.updatePassword(req.session.user.email, req.body.cpassword, req.body.password)
          .then(() => {
            req.flash('Password updated.');
            res.send({
              ok: true
            });
          })
          .catch((error) => {
            req.flash('Password incorrect.');
            res.send({
              ok: false,
              error
            });
          });
      }
    });
  }
  else {
    const err = new Error('Missing required fields');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
