'use strict';

/* eslint-env node */

const util = require('../_util');
const Location = require('./location');
const Driver = require('./driver');
const Connection = require('./connection');
const ticker = require('../ticker');
const socketlib = require('../socket');

const tripDb = 'trips';
const speed = 10000;

exports.get = driverid => util.knex(tripDb).where('driverid', driverid)
  .join('locations', 'trips.destinationid', 'locations.id')
  .select('trips.destinationid', 'locations.name', 'trips.startid', 'trips.progress', 'trips.underway')
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
      return deleteTrip(driverid).then(() =>
        util.knex(tripDb).insert({
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
  })
  .catch((error) => {
    console.log('Error in models/trip.create', error); // eslint-disable-line
  });

exports.begin = driverid => Driver.updateValue(driverid, 'traveling', true)
  .then(() =>
    util.knex(tripDb).where('driverid', driverid)
    .orderBy('sequence').first()
    .update({
      underway: true
    }, '*'));


const tickerTripProgress = function tickerTripProgress(testing = false) {
  return util.knex(tripDb).where('underway', true)
    .then((trips) => {
      // TODO: this is a mess, needs serious optimization
      // TODO: grab speed from driver->vehicle speed
      if (trips.length > 0) {
        // console.log('trips: ', trips.map(e =>
        // `${e.driverid} ${e.startid}->${e.destinationid} Progress: ${e.progress}`));
        for (let i = 0; i < trips.length; i++) {
          const trip = trips[i];
          const socket = socketlib.driverSocket(trip.driverid);
          const newProgress = trip.progress + speed;

          if (testing || newProgress > trip.distance) {
            socket.emit('tripProgress', {
              progress: 'done'
            });
            return Promise.all([
                deleteTrip(trip.driverid),
                Driver.update(trip.driverid, {
                  location: trip.destinationid,
                  traveling: false
                }),
                Location.visit(trip.driverid, trip.destinationid)
              ])
              .catch(
                (error) => { // jshint ignore:line
                  console.log('ERROR in tickerTripProgress-deleteTrip', error); // eslint-disable-line
                });
          }
          // update client and db with new progress distance
          //     io.sockets.connected[cbSocket.id].emit('message', msg);
          socket.emit('tripProgress', {
            progress: newProgress
          });
          return util.knex(tripDb).where('driverid', trip.driverid)
            .update('progress', newProgress, 'progress');
        }
      }
      return undefined;
    });
};

exports.tick = tickerTripProgress;
ticker.addCallback(tickerTripProgress);


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
