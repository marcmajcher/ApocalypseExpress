'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Trip = require('../models/trip');

router.use(util.loginRequired);

/* DB functions */

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
  Trip.get(req.session.user.driverid)
    .then((trip) => {
      res.send({
        trip
      });
    })
    .catch((err) => {
      err.status = 500;
      next(err);
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
        Trip.del(driverid)
          .then(() => {
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
router.post('/', /* isNotTraveling, */ (req, res /* , next */) => { // TODO: catch errors for delete
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
          Trip.del(driverid)
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
  Trip.del(req.session.user.driverid)
    .then(() => {
      res.send('ok'); // TODO: send back trip id, or trips deleted, or something
    })
    .catch((err) => {
      err.status = 500;
      next(err);
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
