'use strict';

const express = require('express');
const router = express.Router();
const util = require('../util/route_utils');

router.use(util.loginRequired);

router.get('/', (req, res, next) => {
  var myData = {};
  util.knex('locations').then((cities) => {
    myData.locations = cities.reduce(function(l, c) {
      l[c.id] = c;
      delete l[c.id].id;
      return l
    }, {});
    util.knex('connections').then((links) => {
      myData.connections = links;
      res.send(myData);
    });
  });
});

module.exports = router;
