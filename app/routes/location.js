'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  util.knex('locations').where('id',
      util.knex('drivers').where('id', req.session.user.driverid).select('id')).first()
    .then((location) => {
      res.send(location);
    });
});

module.exports = router;
