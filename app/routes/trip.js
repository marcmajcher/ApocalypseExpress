'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

/* DB functions */

function deleteTripForDriver(driverid, next) {
  return util.knex('trips').where('driverid', driverid).del()
    .catch((err) => {
      const error = new Error(`Trip DB error on delete: ${err}`);
      error.status = 500;
      next(error);
    });
}

function adjacentConnections(driverid, destinationid, next) {
  return util.knex('connections').where({
      end: destinationid,
      start: util.knex('drivers').where('id', driverid).select('location')
    })
    .then((connections) => {
      if (connections.length === 0) {
        const error = new Error(`Destination ${destinationid} not adjacent`);
        error.status = 500;
        next(error);
      }
      return connections;
    })
    .catch((err) => {
      const error = new Error(`Trip DB error: ${err}`);
      error.status = 500;
      next(error);
      return 0;
    });
}

/* Trip Routes*/

/* Return current trip info */
router.get('/', (req, res, next) => {
  util.knex('trips').where('driverid', req.session.user.driverid)
    .join('locations', 'trips.locationid', 'locations.id')
    .select('trips.locationid', 'locations.name', 'trips.sequence')
    .orderBy('sequence')
    .then((trip) => {
      res.send({
        trip
      });
    })
    .catch((err) => {
      const error = new Error(`Trip DB error: ${err}`);
      error.status = 500;
      next(error);
      return 0;
    });
});

/* Create a new trip with given destination or destinations *

  - Check that destination is connected to current location
    - get driverid from req.session.user.driverid
    - select driver from drivers where id = driverid
    - select location from locations where id = driver.location
    - select * from connections where start = location and end = destination
      - if there are things, cool. if not, bail.
*/

router.put('/', /* isNotTraveling, */ (req, res, next) => {
  const driverid = req.session.user.driverid;
  adjacentConnections(driverid, req.body.destination, next)
    .then((connections) => {
      if (connections.length > 0) {
        deleteTripForDriver(driverid, next).then(() => {
          const trip = {
            driverid: req.session.user.driverid,
            sequence: 1,
            locationid: req.body.destination,
            distance: connections[0].distance
          };
          util.knex('trips').insert(trip)
            .returning('locationid')
            .then((ids) => {
              util.knex('locations').where('id', ids[0]).first()
                .then((location) => {
                  res.send({
                    ok: true,
                    id: location.id,
                    name: location.name
                  });
                });
            })
            .catch((err) => {
              const error = new Error(`Trip DB error: ${err}`);
              error.status = 500;
              next(error);
            });
        });
      }
    });
});

/* Begin current trip */
router.post('/', /* isNotTraveling, */ (req, res, next) => {
  const driverid = req.session.user.driverid;
  // TODO: use timer to travel (instant for admin)
  // TODO: add 'traveling' column, check that not already traveling
  util.knex('trips').where('driverid', driverid)
    .orderBy('sequence').first()
    .select('locationid')
    .then((destination) => {
      util.knex('drivers').where('id', driverid)
        .update('location', destination.locationid)
        .then(() => {
          deleteTripForDriver(driverid, next).then(() => {
            util.knex('driver_visited').where({
                locationid: destination.locationid,
                driverid
              })
              .then((entry) => {
                if (entry.length === 0) {
                  util.knex('driver_visited')
                    .insert({
                      locationid: destination.locationid,
                      driverid
                    }, '*')
                    .then(() => {
                      res.send('ok');
                    });
                }
                else {
                  res.send('ok');
                }
              });
            // TODO: error handling
            // TODO: better response - include id of next/current location?
          });
        });
    });
});

/* Clear current trip */
router.delete('/', /* isNotTraveling, */ (req, res, next) => {
  deleteTripForDriver(req.session.user.driverid, next)
    .then(() => {
      res.send('ok');
    })
    .catch((err) => {
      const error = new Error(`Trip DB error: ${err}`);
      error.status = 500;
      next(error);
    });
});

module.exports = router;

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
