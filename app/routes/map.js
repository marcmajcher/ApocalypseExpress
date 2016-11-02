'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  const myData = {};
  util.knex('locations').then((cities) => {
    myData.locations = cities.reduce((l, c) => {
      l[c.id] = c;
      delete l[c.id].id;
      return l;
    }, {});
    util.knex('connections').then((links) => {
      myData.connections = links;
      res.send(myData);
    });
  });
});

module.exports = router;
