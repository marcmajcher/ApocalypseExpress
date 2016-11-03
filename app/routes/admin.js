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
// 
// router.patch('/map/location/:locid', (req, res) => {
//   // TODO: update location resource with submitted data;
//   res = req;
//   req = res;
// });

module.exports = router;
