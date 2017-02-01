'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Trip = require('../models/trip');
const Driver = require('../models/driver');

router.use(util.loginRequired);

/* Return current trip info */ // TODO: add traveling status
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

  Trip.create(driverid, req.body.destination)
    .then((location) => {
      res.io.emit("apoxsox", "trip derp")
      res.send({
        ok: true,
        id: location.id,
        name: location.name
      });
    })
    .catch((err) => {
      const error = new Error(`Trip DB error: ${err}`);
      error.status = 500;
      next(error);
    });
});

/* Begin current trip */
router.post('/go', (req, res, next) => { // TODO: catch errors for delete, /* isNotTraveling, */
  // TODO: use timer to travel (instant for admin)
  // TODO: add 'traveling' column, check that not already traveling
  // TODO: what's the behavior when we start a trip that doesn't exist? TEST
  Driver.get(req.session.user.driverid)
    .then((driver) => {
      if (!driver.traveling) {
        Trip.begin(req.session.user.driverid)
          .then(() => {
            res.send('ok');
          })
          .catch((err) => {
            err.status = 500;
            next(err);
          });
      }
    });
  // TODO: error handling
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
