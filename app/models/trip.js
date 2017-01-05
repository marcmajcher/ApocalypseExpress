'use strict';

/* eslint-env node */

const util = require('../_util');
const Location = require('./location');

exports.get = driverid => util.knex('trips').where('driverid', driverid)
  .join('locations', 'trips.locationid', 'locations.id')
  .select('trips.locationid', 'locations.name', 'trips.sequence')
  .orderBy('sequence');

const deleteTrip = driverid => util.knex('trips').where('driverid', driverid).del();
exports.del = deleteTrip;

/* Create a new trip for the given driver to the given location, returns location */
exports.create = (driverid, destinationid) =>
  util.knex('connections').where({
    end: destinationid,
    start: util.knex('drivers').where('id', driverid).select('location')
  })
  .then((connections) => {
    if (connections.length > 0) {
      return deleteTrip(driverid).then(() =>
        util.knex('trips').insert({
          driverid,
          sequence: 1,
          locationid: destinationid,
          distance: connections[0].distance
        })
        .returning('locationid')
        .then(ids => Location.get(ids[0]))
      );
    }
    return undefined;
  });
