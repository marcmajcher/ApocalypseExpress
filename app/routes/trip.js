'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

function isNotTraveling(req, res, next) {
  util.knex('drivers').where('id', req.session.user.driverid).first().select('traveling')
    .then((traveling) => {
      if (traveling) {
        res.send('traveling')
      }
      else {
        next();
      }
    });
}

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
router.put('/', isNotTraveling, (req, res, next) => {
  util.knex('trips').where('driverid', req.session.user.driverid).del()
    .then(() => {
      const destinationIds = (Array.isArray(req.body.destination)) ?
        req.body.destination : [req.body.destination];
      const values = destinationIds.map((element, index) => ({
        driverid: req.session.user.driverid,
        sequence: index + 1,
        locationid: element
      }));
      util.knex('trips').insert(values).returning('locationid')
        .then((ids) => {
          util.knex('locations').where('id', ids[0]).first() // TODO: handle array of ids
            .then((location) => {
              res.send({
                ok: true,
                id: location.id,
                name: location.name
              });
              // TODO: better response - include id?
            });
        })
        .catch((err) => {
          const error = new Error(`Trip DB error: ${err}`);
          error.status = 500;
          next(error);
        });
    });
});

/* Append the given destination to the current trip */
// TODO: create trip sequence index table?
router.patch('/', (req, res, next) => {
  util.knex('trips').where('driverid', req.session.user.driverid).max('sequence').first()
    .then((max) => {
      const seq = max.max + 1;
      util.knex('trips').insert({
          driverid: req.session.user.driverid,
          sequence: seq,
          locationid: req.body.destination
        })
        .then(() => {
          res.send('ok');
          // TODO: better response - include id?
        })
        .catch((err) => {
          const error = new Error(`Trip DB error: ${err}`);
          error.status = 500;
          next(error);
        });
    });
});

/* Begin current trip */
router.post('/', isNotTraveling, (req, res) => {
  // TODO: use timer to travel
  // TODO: add 'traveling' column, check that not already traveling
  // TODO: check to verify that destination is adjacent to current location
  util.knex('trips').where('driverid', req.session.user.driverid)
    .orderBy('sequence').first()
    .select('locationid')
    .then((destination) => {
      util.knex('drivers').where('id', req.session.user.driverid)
        .update('location', destination.locationid)
        .then(() => {
          // TODO: remove current destination when destination is reached
          res.send('ok');
          // TODO: better response - include id of next destination?
        });
    });
});

/* Clear current trip */
router.delete('/', isNotTraveling, (req, res, next) => {
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
