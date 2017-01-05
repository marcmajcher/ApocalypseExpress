'use strict';

/* eslint-env node */
/* eslint no-magic-numbers: 0 */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Joi = require('joi');
const User = require('../models/user');

const createSchema = Joi.object().keys({
  email: Joi.string().email().valid(Joi.ref('vemail'))
    .required(),
  vemail: Joi.string().email().required(),
  firstname: Joi.string().max(60).required(),
  lastname: Joi.string().max(60).required(),
  password: Joi.string().max(60).min(8).valid(Joi.ref('vpassword'))
    .required(),
  vpassword: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  firstname: Joi.string().max(60).required(),
  lastname: Joi.string().max(60).required()
});

const updatePasswordSchema = Joi.object().keys({
  cpassword: Joi.string().required(),
  password: Joi.string().max(60).min(8).valid(Joi.ref('vpassword'))
    .required(),
  vpassword: Joi.string().required()
});

/* Create new user */
router.post('/', (req, res, next) => {
  Joi.validate(req.body, createSchema, (err) => {
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

router.get('/account', (req, res) => {
  util.renderTemplate(req, res, 'account');
});

/* Update user account information */
router.patch('/account', (req, res, next) => {
  if (req.body.firstname && req.body.lastname) {
    Joi.validate(req.body, updateSchema, (err) => {
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
            req.flash('Name updated.');
            util.renderTemplate(req, res, 'account');
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
  else if (req.body.cpassword && req.body.password && req.body.vpassword) {
    Joi.validate(req.body, updatePasswordSchema, (err) => {
      if (err) {
        err.status = 500;
        next(err);
      }
      else {
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
    });
  }
  else {
    const err = new Error('Missing required fields');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
