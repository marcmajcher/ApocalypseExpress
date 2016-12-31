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
    }))
    .catch(error => error);
}

/* Select all connections from db */
function getAllConnections(mapData) {
  return util.knex('connections')
    .then((connections) => {
      mapData.connections = connections;
      return mapData;
    })
    .catch(error => error);
}

/* Select locations from db for a given user */
function getUserLocations(driverId) {
  return util.knex('locations')
    .join('driver_visited', {
      'locations.id': 'driver_visited.locationid',
      'driver_visited.driverid': driverId
    })
    .select('id', 'name', 'latitude', 'longitude', 'population', 'tech', 'factionid', 'type')
    .then(locations => ({
      locations: indexLocations(locations)
    }))
    .catch(error => error);
}

function getUserConnections(mapData) {
  return util.knex('connections')
    .whereIn('start', Object.keys(mapData.locations))
    .then((connections) => {
      mapData.connections = connections;
      return mapData;
    })
    .catch(error => error);
}

function getConnectedLocations(mapData) {
  return util.knex('locations')
    .whereIn('id', mapData.connections.map(el => el.end))
    .then((locations) => {
      locations.forEach((el) => {
        mapData.locations[el.id] = el;
      });
      // mapData.locations = locations;
      return mapData;
    })
    .catch(error => error);
}

/* GET /map route */

router.get('/', (req, res, next) => {
  if (req.session.user.role === 'admin') {
    getAllLocations()
      .then(getAllConnections)
      .then((mapData) => {
        res.send(mapData);
      })
      .catch((error) => {
        next(error);
      });
  }
  else {
    getUserLocations(req.session.user.driverid)
      .then(getUserConnections)
      .then(getConnectedLocations)
      .then((mapData) => {
        res.send(mapData);
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = router;
