'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  util.knex('drivers').where('id', req.session.user.driverid).first()
    .then((driver) => {
      res.send(driver);
    })
    .catch((/* error */) => {
      res.send(500);
    });
});

module.exports = router;
