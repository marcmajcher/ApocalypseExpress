'use strict';

/* eslint-env node */

const util = require('../_util');
const Location = require('./location');
const Driver = require('./driver');
const Connection = require('./connection');
const Vehicle = require('./vehicle');
const ticker = require('../ticker');
const socketlib = require('../socket');

const tripDb = 'trips';
const speedupFactor = 100; // 16.6667; /* 2.7777778 */ // eslint-disable-line

exports.get = driverid => util.knex(tripDb).where('driverid', driverid)
  .join('locations', 'trips.destinationid', 'locations.id')
  .select('locations.name', 'locations.latitude', 'locations.longitude',
    'trips.destinationid', 'trips.startid', 'trips.progress', 'trips.underway')
  .orderBy('sequence');

// TODO: don't delete if underway
const deleteTrip = driverid => util.knex(tripDb)
  .where('driverid', driverid).del()
  .catch((error) => {
    console.log('Error in models/trip.deleteTrip', error); // eslint-disable-line
  });
exports.del = deleteTrip;

/* Create a new trip for the given driver to the given location, returns location */
exports.create = (driverid, destinationid) =>
  Connection.getDriverDestinationConnections(driverid, destinationid)
  .then((connections) => {
    if (connections.length > 0) {
      return deleteTrip(driverid)
        .then(() => Driver.get(driverid))
        .then(driver => Vehicle.get(driver.vehicleid))
        .then(vehicle => util.knex(tripDb).insert({
            driverid,
            destinationid,
            startid: connections[0].start,
            distance: connections[0].distance,
            speed: vehicle.topspeed
          })
          .returning('destinationid'))
        .then(ids => Location.get(ids[0]));
    }
    return undefined;
  })
  .catch((error) => {
    console.log('Error in models/trip.create', error); // eslint-disable-line
  });

/* Start the current trip */
exports.begin = driverid => Driver.updateValue(driverid, 'traveling', true)
  .then(() =>
    util.knex(tripDb).where('driverid', driverid)
    .orderBy('sequence').first()
    .update({
      underway: true
    }, '*'));

/* Each second, advance progress of all active trips, end trips when done */
const tickerTripProgress = function tickerTripProgress(testing = false) {
  return util.knex(tripDb).where('underway', true)
    .then((trips) => {
      const promises = [];
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        const emitter = socketlib.driverEmitter(trip.driverid);
        const newProgress = trip.progress + Math.ceil(trip.speed * speedupFactor);

        if (testing || newProgress > trip.distance) {
          emitter.emit('tripProgress', {
            progress: 'done'
          });
          promises.push(deleteTrip(trip.driverid));
          promises.push(Driver.update(trip.driverid, {
            location: trip.destinationid,
            traveling: false
          }));
          promises.push(Location.visit(trip.driverid, trip.destinationid));
        }
        // update client and db with new progress distance
        emitter.emit('tripProgress', {
          progress: newProgress
        });
        promises.push(util.knex(tripDb).where('driverid', trip.driverid)
          .update('progress', newProgress, 'progress'));
      }
      return Promise.all(promises)
        .catch((error) => { // jshint ignore:line
          console.log('ERROR in tickerTripProgress-deleteTrip', error); // eslint-disable-line
        });
    });
};

exports.tick = tickerTripProgress;
ticker.addCallback(tickerTripProgress);
