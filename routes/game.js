'use strict';

const express = require('express');
const router = express.Router();
const util = require('../util/route_utils');

router.use(util.loginRequired);

router.get('/', (req, res, next) => {
  let user = req.session.user;
  if (user) {
    util.knex('drivers').where('id', user.driverid).first().then((driver) => {
      util.knex('locations').where('id', driver.location).first().then((location) => {
        util.renderTemplate(req, res, 'game', {driver: driver, location: location});
      })
    })
  }
  else {
    res.redirect('index');
  }
});

module.exports = router;
