'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

/* Return current trip info */
router.get('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid).orderBy('sequence')
    .then((trips) => {
      res.send({
        trip: trips
      });
    });
});

/* Create a new trip with given destination or destinations */
router.put('/', (req, res, next) => {
  util.knex('trips').where('driverid', req.session.user.driverid).del()
    .then(() => {
      const ids = (Array.isArray(req.body.destination)) ?
        req.body.destination : [req.body.destination];
      const values = ids.map((element, index) => ({
        driverid: req.session.user.driverid,
        sequence: index + 1,
        locationid: element
      }));
      util.knex('trips').insert(values)
        .then(() => {
          res.send('ok');
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
        })
        .catch((err) => {
          const error = new Error(`Trip DB error: ${err}`);
          error.status = 500;
          next(error);
        });
    });
});

/* Begin current trip */
router.post('/', (req, res) => {
  // TODO: use timer to travel
  // TODO: add 'traveling' column, check that not already traveling
  // TODO: check to verify that destination is adjacent to current location
  const destinationQuery = util.knex('trips').where('driverid', req.session.user.driverid)
    .orderBy('sequence').first()
    .select('locationid')
    .then((destination) => {
      util.knex('drivers').where('id', req.session.user.driverid)
      .update('location', destination.locationid)
      .then(() => {
        res.send('ok');
      });
    });
});

/* Clear current trip */
router.delete('/', (req, res, next) => {
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
