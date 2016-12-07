'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.adminRequired);

/* GET home page. */
router.get('/', (req, res) => {
  util.renderTemplate(req, res, 'admin/index');
});

router.get('/map', (req, res) => {
  util.renderTemplate(req, res, 'admin/map');
});

router.get('/mapseed', (req, res) => {
  util.knex('locations').then((locations) => {
    util.knex('connections').then((connections) => {
      res.setHeader('Content-type', 'text/plain');
      res.charset = 'UTF-8';
      res.render('admin/mapseed.ejs', {
        data: {
          locations,
          connections
        }
      });
    });
  });
});

router.patch('/map/location/:locid', (req, res) => {
  const data = req.body;
  util.knex('locations').where('id', req.params.locid).first().update({
      name: data.name,
      longitude: data.longitude,
      latitude: data.latitude,
      description: data.description,
      population: data.population,
      tech: data.tech,
      type: data.type,
      factionid: data.factionid
    }, '*')
    .then(() => {
      res.send({
        status: 'ok'
      });
    })
    .catch((err) => {
      res.send({
        status: 'nok',
        error: err
      });
    });
});

module.exports = router;
