'use strict';

/* eslint-env node */

const util = require('../_util');
const Location = require('./location');
const Driver = require('./driver');
const ticker = require('../ticker');

const speed = 10000;

exports.get = driverid => util.knex('trips').where('driverid', driverid)
  .join('locations', 'trips.destinationid', 'locations.id')
  .select('trips.destinationid', 'locations.name', 'trips.startid', 'trips.progress', 'trips.underway')
  .orderBy('sequence');

// TODO: don't delete if underway
const deleteTrip = driverid => util.knex('trips').where('driverid', driverid).del();
exports.del = deleteTrip;

/* Create a new trip for the given driver to the given location, returns location */
exports.create = (driverid, destinationid) => util.knex('connections').where({
    end: destinationid,
    start: Driver.getValue(driverid, 'location')
  })
  .then((connections) => {
    if (connections.length > 0) {
      return deleteTrip(driverid).then(() =>
        util.knex('trips').insert({
          driverid,
          destinationid,
          startid: connections[0].start,
          distance: connections[0].distance
        })
        .returning('destinationid')
        .then(ids => Location.get(ids[0]))
      );
    }
    return undefined;
  });

exports.begin = driverid => Promise.all([
  util.knex('trips').where('driverid', driverid)
  .orderBy('sequence').first()
  .update({
    underway: true
  }, '*'),
  Driver.updateValue(driverid, 'traveling', true)
]);

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

const tickerTripProgress = function tickerTripProgress(testing = false) {
  return util.knex('trips').where('underway', true)
    .then((trips) => {
      // TODO: this is a mess, needs serious optimization
      // TODO: grab speed from driver->vehicle speed
      if (trips.length > 0) {
        for (let i = 0; i < trips.length; i++) {
          const trip = trips[i];
          const newProgress = trip.progress + speed;

          if (testing || newProgress > trip.distance) {
            return Location.visit(trip.driverid, trip.destinationid)
              .then(Driver.update(trip.driverid, {
                location: trip.destinationid,
                traveling: false
              }))
              .then(deleteTrip(trip.driverid)) // TODO: not chaining properly at top of chain
              .catch((error) => {
                throw new Error('YOU FUCKED UP', error);
              });
          }
          return util.knex('trips').where('driverid', trip.driverid)
            .update('progress', newProgress, 'progress');
        }
      }
      return undefined;
    });
};

exports.tick = tickerTripProgress;
ticker.addCallback(tickerTripProgress);
