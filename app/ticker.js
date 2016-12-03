'use strict';

/* eslint-env node */

const tickInterval = 1000;

function tick() {
  // console.log('TICK', Date.now());
}

module.exports = setInterval(tick, tickInterval);
