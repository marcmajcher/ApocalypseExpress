'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

/* GET home page. */
router.get('/', util.adminRequired, (req, res) => {
  util.renderTemplate(req, res, 'admin/index');
});

router.get('/map', util.adminRequired, (req, res) => {
  util.renderTemplate(req, res, 'admin/map');
});

router.patch('/map/location/:locid', (req, res) => {
  const data = req.body;
  util.knex('locations').where('id', data.locid).first().update({
      name: data.name,
      longitude: data.longitude,
      latitude: data.latitude,
      description: data.description,
      population: data.population,
      tech: data.tech,
      type: data.type
    }, '*')
    .then(() => {
      res.send({
        status: 'ok'
      });
    })
    .catch(() => {
    });
});

module.exports = router;

// { locname: 'Austin',
//      locx: '30.417841658440274',
//      locy: '-97.40769912703882',
//      description: 'This is a location.',
//      population: '10000',
//      tech: '5',
//      type: 'freehold' },}
