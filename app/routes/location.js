'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Location = require('../models/location');

router.use(util.loginRequired);

router.get('/', (req, res, next) => {
  Location.localList(req.session.user.driverid)
    .then((location) => {
      res.send(location);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  // TODO: write tests
  Location.get(req.params.id)
    .then((location) => {
      res.send(location);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

module.exports = router;
