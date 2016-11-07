'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  // TODO: update to only show locations visited by user
  const myData = {};
  util.knex('locations').then((locations) => {
    myData.locations = locations.reduce((last, cur) => {
      last[cur.id] = cur;
      return last;
    }, {});
    util.knex('connections').then((connections) => {
      myData.connections = connections;
      res.send(myData);
    });
  });
});

module.exports = router;