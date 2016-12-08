'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

/* Convert locations array into indexed object */
function indexLocations(locations) {
  return locations.reduce((last, cur) => {
    last[cur.id] = cur;
    return last;
  }, {});
}

/* Select all locations from db and index */
function getAllLocations() {
  return util.knex('locations')
    .then(locations => ({
      locations: indexLocations(locations)
    }));
}

/* Select all connections from db */
function getAllConnections(mapData) {
  return util.knex('connections')
    .then((connections) => {
      mapData.connections = connections;
      return mapData;
    });
}

router.get('/', (req, res) => {
  const myData = {};

  if (req.session.user.role === 'admin') {
    getAllLocations()
      .then(getAllConnections)
      .then((mapData) => {
        res.send(mapData);
      });
  }
  else {
    util.knex('locations').join('driver_visited', {
        'locations.id': 'driver_visited.locationid',
        'driver_visited.driverid': req.session.user.driverid
      })
      .select('id', 'name', 'latitude', 'longitude', 'population', 'tech', 'factionid', 'type')
      .then((locations) => {
        myData.locations = indexLocations(locations);
        util.knex('connections').then((connections) => {
          myData.connections = connections;
          res.send(myData);
        });
      });
  }
});

module.exports = router;
