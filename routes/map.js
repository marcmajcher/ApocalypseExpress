'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

router.get('/', (req, res, next) => {
  var myData = {};
  knex('locations').then((cities) => {
    myData.locations = cities.reduce(function(l,c) {l[c.id]=c;delete l[c.id].id;return l},{});
    knex('city_link').then((links) => {
      myData.connections = links;
      res.send(myData);
    });
  });
});

module.exports = router;
