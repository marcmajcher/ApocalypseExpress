'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

router.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    util.renderTemplate(req, res, 'game');
  }
  else {
    res.redirect('index');
  }
});

module.exports = router;
