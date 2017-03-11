'use strict';

/* eslint-env node */

const util = require('../_util');
const connectionDb = 'connections';
const Model = require('./_model');
const Driver = require('./driver');

const Connection = new Model(connectionDb);

Connection.getUserConnections = mapData =>
  util.knex(connectionDb)
  .whereIn('start', Object.keys(mapData.locations))
  .then((connections) => {
    mapData.connections = connections;
    return mapData;
  })
  .catch(console.log.bind(console)); // eslint-disable-line

Connection.getDriverDestinationConnections = (driverid, destinationid) =>
  util.knex(connectionDb).where({
    end: destinationid,
    start: Driver.getValue(driverid, 'location')
  });

module.exports = Connection;
