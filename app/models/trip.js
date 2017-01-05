'use strict';

/* eslint-env node */

const util = require('../_util');
const Location = require('./location');
const ticker = require('../ticker');

ticker.addCallback(
  () => console.log('Trip callback')
);

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

exports.begin = driverid =>
  util.knex('trips').where('driverid', driverid)
  .orderBy('sequence').first()
  .select('locationid')
  .then((destination) => {
    console.log('****FREAKIN DESTINATION:', destination);
    return util.knex('drivers').where('id', driverid)
      .update('location', destination.locationid, '*')
      .then(location => Location.visit(driverid, location.id))
      .then(() => deleteTrip(driverid));
  });

// function isNotTraveling(req, res, next) {
//   util.knex('drivers').where('id', req.session.user.driverid).first().select('traveling')
//     .then((traveling) => {
//       next();
//       if (traveling) {
//         next();
//         // res.send('traveling');
//       }
//       else {
//         next();
//       }
//     });
// }
