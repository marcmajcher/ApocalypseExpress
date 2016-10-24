'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

router.get('/', (req, res, next) => {
  var myData = {};
  knex('locations').then((cities) => {
    myData.locations = cities.reduce(function(l,c) {l[c.id]=c;delete l[c.id].id;return l},{});
  //   anonymous {
  // id: 1952,
  // name: 'Gatesville',
  // latitude: 31.4352,
  // longitude: -97.7439 },
    knex('city_link').then((links) => {
      myData.connections = links;
  // anonymous { city1: 1867, city2: 1956, distance: 53900 },
      res.send(myData);
    });
  });
});

module.exports = router;
