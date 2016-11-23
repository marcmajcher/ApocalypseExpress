'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

// | GET | */trip* | Get current trip information
router.get('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid).orderBy('sequence')
    .then((trips) => {
      res.send({
        trip: trips
      });
    });
});

// | POST | */trip* | Start trip
router.post('/', (req, res) => {
  // TODO: use timer to travel
  // TODO: add 'traveling' column, check that not already traveling
  // TODO: check to verify that destination is adjacent to current location
  const destinationQuery = util.knex('trips').where('driverid', req.session.user.driverid)
    .orderBy('sequence').first()
    .select('destination');

  util.knex('drivers').where('driverid', req.session.user.driverid)
    .update('location', destinationQuery)
    .then(() => {
      res.send('ok');
    });
});

// | PUT | */trip* | Create new trip with destination id[s] {id/[ids]}
router.put('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid).del()
    .then(() => {
      const ids = (Array.isArray(req.body.destination)) ?
        req.body.destination : [req.body.destination];
      util.knex.insert(ids.map((element, index) => ({
        driverid: req.session.user.driverid,
        sequence: index,
        locationid: element
      })));
      res.send('ok');
    });
});

// | PATCH | */trip* | Add destination id[s] to current trip route {id/[ids]}
router.patch('/', (req, res) => {
  res.send('ok');
});

// | DELETE | */trip* | Clear current trip
router.delete('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid).del()
    .then(() => {
      res.send('ok');
    });
});


module.exports = router;
