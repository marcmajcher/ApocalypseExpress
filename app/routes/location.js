'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  util.knex('locations').where('id',
      util.knex('drivers').where('id', req.session.user.driverid).select('location')).first()
    .then((location) => {
      util.knex('connections').where('start', location.id)
        .innerJoin('locations', 'locations.id', 'connections.end')
        .select('id', 'distance', 'name', 'factionid', 'type')
        .then((connections) => {
          location.connections = connections;
          res.send(location);
        });
    });
});

// router.get('/:id', (req, res) => {
//
// });
// | GET | */location/:locid* | Brief info for given location

module.exports = router;
