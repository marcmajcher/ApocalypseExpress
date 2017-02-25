'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('../_util');
const Goods = require('../models/goods');

router.use(util.loginRequired);

router.get('/:id', (req, res, next) => {
  Goods.get(req.params.id)
    .then((good) => {
      res.send(good);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
});

module.exports = router;
