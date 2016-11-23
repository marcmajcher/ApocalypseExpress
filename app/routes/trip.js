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
      console.log('TRIPS:', trips);
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
    .orderBy('sequence').first().select('destination');

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

    });
});

// | PATCH | */trip* | Add destination id[s] to current trip route {id/[ids]}
router.patch('/', (req, res) => {

});

// | DELETE | */trip* | Clear current trip
router.delete('/', (req, res) => {
  util.knex('trips').where('driverid', req.session.user.driverid).del()
    .then(() => {
      res.send('ok');
    });
});


module.exports = router;
