'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Driver = require('../models/driver');
const md5 = require('md5');

router.use(util.loginRequired);

router.get('/', (req, res, next) => {
  Driver.get(req.session.user.driverid)
    .then((driver) => {
      driver.room = md5(req.session.user.hashedPassword.slice(10, 20));
      res.send(driver);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

module.exports = router;
