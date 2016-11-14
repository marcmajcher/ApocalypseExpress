'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    util.knex('drivers').where('id', user.driverid).first().then((driver) => {
      util.knex('locations').where('id', driver.location).first().then(
        (location) => {
          util.knex('connections')
            .where('loc1', driver.location).orWhere('loc2', driver.location)
            .then((connections) => {
              location.connections = connections;
              util.renderTemplate(req, res, 'game', {
                driver,
                location
              });
            });
        });
    });
  }
  else {
    res.redirect('index');
  }
});

module.exports = router;
