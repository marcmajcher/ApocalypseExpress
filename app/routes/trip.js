'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const util = require('./_util');

router.use(util.loginRequired);

// | GET | */trip* | Get current trip information
router.get('/', (req, res) => {
});

// | POST | */trip* | Start trip
router.post('/', (req, res) => {

});

// | PUT | */trip* | Create new trip with destination id[s] {id/[ids]}
router.put('/', (req, res) => {

});

// | PATCH | */trip* | Add destination id[s] to current trip route {id/[ids]}
router.patch('/', (req, res) => {

});

// | DELETE | */trip* | Clear current trip
router.delete('/', (req, res) => {

});


module.exports = router;
