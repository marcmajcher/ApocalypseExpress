'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  util.knex('locations').where('id',
      util.knex('drivers').where('id', req.session.user.driverid).select('id')).first()
    .then((location) => {
      util.knex('connections')
        .innerJoin('locations',
          function joinargs() {
            this.on('connections.loc2', '=', 'locations.id')
              .orOn('connections.loc1', '=', 'locations.id');
          })
        .where('loc1', location.id).orWhere('loc2', location.id)
        .distinct(util.knex.raw('on (name) name'))
        .select('name', 'loc1', 'loc2', 'distance')
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
