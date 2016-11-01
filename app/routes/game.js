'use strict';

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  let user = req.session.user;
  if (user) {
    util.knex('drivers').where('id', user.driverid).first().then((driver) => {
      util.knex('locations').where('id', driver.location).first().then(
        (location) => {
          util.renderTemplate(req, res, 'game', {
            driver: driver,
            location: location
          });
        });
    });
  }
  else {
    res.redirect('index');
  }
});

module.exports = router;
