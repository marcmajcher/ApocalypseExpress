'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

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

/* Return current trip info */
router.get('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid)
    .join('locations', 'trips.locationid', 'locations.id')
    .select('trips.locationid', 'locations.name', 'trips.sequence')
    .orderBy('sequence')
    .then((trip) => {
      res.send({
        trip
      });
    });
});

/* Create a new trip with given destination or destinations */

/*
  - Check that destination is connected to current location
    - get driverid from req.session.user.driverid
    - select driver from drivers where id = driverid
    - select location from locations where id = driver.location
    - select * from connections where start = location and end = destination
      - if there are things, cool. if not, bail.

*/

router.put('/', /* isNotTraveling, */ (req, res, next) => {
  const driverid = req.session.user.driverid;
  // Verify that destination is adjacent to the driver's current location
  util.knex('connections').where({
      end: req.body.destination,
      start: util.knex('drivers').where('id', driverid).select('location')
    })
    .then((connections) => {
      if (connections.length > 0) {
        // do the thing
        util.knex('trips').where('driverid', driverid).del()
          .then(() => {
            const trip = {
              driverid: req.session.user.driverid,
              sequence: 1,
              locationid: req.body.destination,
              distance: 1000 // TODO: get correct distance for trip
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
      else {
        const error = new Error('Destination not adjacent');
        error.status = 500;
        next(error);
      }
    });
});

/* Begin current trip */
router.post('/', /* isNotTraveling, */ (req, res) => {
  const driverid = req.session.user.driverid;
  // TODO: use timer to travel
  // TODO: add 'traveling' column, check that not already traveling
  // TODO: *** check to verify that destination is adjacent to current location
  // TODO: delete drip after done
  util.knex('trips').where('driverid', driverid)
    .orderBy('sequence').first()
    .select('locationid')
    .then((destination) => {
      util.knex('drivers').where('id', driverid)
        .update('location', destination.locationid)
        .then(() => {
          // remove current destination when destination is reached
          util.knex('trips').where('driverid', driverid).del()
            .then(() => {
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
  util.knex('trips').where('driverid', req.session.user.driverid).del()
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
