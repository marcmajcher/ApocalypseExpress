'use strict';

/* eslint-env node */

const util = require('../_util');
const Connection = require('./connection');
const Driver = require('./driver');
const Goods = require('./goods');
const locationDb = 'locations';

/* Convert locations array into indexed object */
function indexLocations(locations) {
  return locations.reduce((last, cur) => {
    last[cur.id] = cur;
    return last;
  }, {});
}

exports.list = () => util.knex(locationDb);

/* Select all locations from db and index */
exports.getAllLocations = () => util.knex(locationDb)
  .then(locations => ({
    locations: indexLocations(locations)
  }))
  .catch(error => error);

/* Select all connections from db */
exports.getAllConnections = mapData =>
  Connection.list()
  .then((connections) => {
    mapData.connections = connections;
    return mapData;
  })
  .catch(error => error);

/* Select locations from db for a given user */
exports.getUserLocations = driverId =>
  util.knex(locationDb)
  .join('driver_visited', {
    'locations.id': 'driver_visited.locationid',
    'driver_visited.driverid': driverId
  })
  .select('id', 'name', 'latitude', 'longitude', 'population', 'tech', 'factionid', 'type')
  .then(locations => ({
    locations: indexLocations(locations)
  }))
  .catch(error => error);

exports.getConnectedLocations = mapData =>
  util.knex(locationDb)
  .whereIn('id', mapData.connections.map(el => el.end))
  .then((locations) => {
    locations.forEach((el) => {
      mapData.locations[el.id] = el;
    });
    // mapData.locations = locations;
    return mapData;
  })
  .catch(error => error);


/* Get the info for a single location given an id */
exports.get = id => util.knex(locationDb).where('id', id).first();

/* Given a driver, get the info for the driver's current location,
   and all adjacent locations */
exports.localList = driverid =>
  util.knex(locationDb).where('id',
    Driver.getValue(driverid, 'location')).first()
  .then(location =>
    util.knex('connections').where('start', location.id)
    .innerJoin(locationDb, 'locations.id', 'connections.end')
    .select('id', 'distance', 'name', 'factionid', 'type')
    .then((connections) => {
      location.connections = connections;

      return Goods.getByLocation(location.id)
        .then((goods) => {
          location.goods = goods;
          return new Promise(resolve => resolve(location));
        });
    })
  );

exports.update = (id, data) =>
  util.knex(locationDb).where('id', id).first().update({
    name: data.name,
    longitude: data.longitude,
    latitude: data.latitude,
    description: data.description,
    population: data.population,
    tech: data.tech,
    type: data.type,
    factionid: data.factionid
  }, '*');

exports.visit = (driverid, locationid) =>
  util.knex('driver_visited').where({
    locationid,
    driverid
  })
  .then((entry) => {
    if (entry.length === 0) {
      return util.knex('driver_visited').insert({
        locationid,
        driverid
      }, '*');
    }
    return undefined;
  });
