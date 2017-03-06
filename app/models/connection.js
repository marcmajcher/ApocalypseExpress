'use strict';

/* eslint-env node */

const util = require('../_util');
const Driver = require('./driver');

const connectionDb = 'connections';

/**
 * Promises a list of all connections between locations
 */
exports.list = () => util.knex(connectionDb);

/**
 * Promises a
 * @param {object} mapData 
 */
exports.getUserConnections = mapData =>
  util.knex(connectionDb)
  .whereIn('start', Object.keys(mapData.locations))
  .then((connections) => {
    mapData.connections = connections;
    return mapData;
  })
  .catch(console.log.bind(console)); // eslint-disable-line

exports.getDriverDestinationConnections = (driverid, destinationid) =>
  util.knex(connectionDb).where({
    end: destinationid,
    start: Driver.getValue(driverid, 'location')
  });
