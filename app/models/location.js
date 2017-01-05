'use strict';

/* eslint-env node */

const util = require('../_util');

/* Get the info for a single location given an id */
exports.get = id => util.knex('locations').where('id', id).first();

/* Given a driver, get the info for the driver's current location,
   and all visited or adjacent locations */
exports.list = driverid =>
  util.knex('locations').where('id',
    util.knex('drivers').where('id', driverid).select('location'))
  .first()
  .then(location =>
    util.knex('connections').where('start', location.id)
    .innerJoin('locations', 'locations.id', 'connections.end')
    .select('id', 'distance', 'name', 'factionid', 'type')
    .then((connections) => {
      location.connections = connections;
      return new Promise(resolve => resolve(location));
    })
  );
