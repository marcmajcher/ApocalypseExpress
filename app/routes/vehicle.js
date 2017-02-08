'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Vehicle = require('../models/vehicle');

router.use(util.loginRequired);

router.get('/', (req, res, next) => {
  Vehicle.get(req.session.user.driverid)
    .then((vehicle) => {
      res.send(vehicle);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

module.exports = router;
