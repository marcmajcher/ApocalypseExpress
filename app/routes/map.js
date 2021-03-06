'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Location = require('../models/location');
const Connection = require('../models/connection');

router.use(util.loginRequired);

/**
 * Returns an object containing all locations and connections available
 * to the user. Returns all locations and connections for admin.
 */
router.get('/', (req, res, next) => {
  if (req.session.user.role === 'admin') {
    Location.getAllLocations()
      .then(Location.getAllConnections)
      .then((mapData) => {
        res.send(mapData);
      })
      .catch((error) => {
        next(error);
      });
  }
  else {
    Location.getUserLocations(req.session.user.driverid)
      .then(Connection.getUserConnections)
      .then(Location.getConnectedLocations)
      .then((mapData) => {
        res.send(mapData);
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = router;
