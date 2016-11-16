'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

// router.get('/', (req, res) => {
// });

module.exports = router;
