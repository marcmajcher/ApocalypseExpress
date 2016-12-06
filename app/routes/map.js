'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  const myData = {};

  if (req.session.user.role === 'admin') {
    util.knex('locations').then((locations) => {
      myData.locations = locations.reduce((last, cur) => {
        last[cur.id] = cur;
        return last;
      }, {});
      util.knex('connections').then((connections) => {
        myData.connections = connections;
        res.send(myData);
      });
    });
  }
  else {
    util.knex('locations').join('driver_visited', {
      'locations.id': 'driver_visited.locationid',
      'driver_visited.driverid': req.session.user.driverid
    })
    .select('id', 'name', 'latitude', 'longitude', 'population', 'tech', 'factionid', 'type')
    .then((locations) => {
      myData.locations = locations.reduce((last, cur) => {
        last[cur.id] = cur;
        return last;
      }, {});
      util.knex('connections').then((connections) => {
        myData.connections = connections;
        res.send(myData);
      });
    });
  }
});

module.exports = router;
