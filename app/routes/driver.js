'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Driver = require('../models/driver');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  Driver.get(req.session.user.driverid)
    .then((driver) => {
      res.send(driver);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

module.exports = router;
