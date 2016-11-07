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
  util.knex('locations').where('id', req.params.locid).first().update({
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
    .catch((err) => {
      res.send({
        status: 'NOPE',
        error: err
      });
    });
});

module.exports = router;
