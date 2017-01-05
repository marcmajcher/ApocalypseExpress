'use strict';

/* eslint-env node */

const tickInterval = 1000;

function tick(ticker) {
  Object.keys(ticker.callbacks).forEach((key) => {
    ticker.callbacks[key]();
  });
}

const tickerObj = {
  interval: undefined,
  callbacks: {},
  addCallback: function(fn) {
    const id = Date.now();
    this.callbacks[id] = fn;
    return id;
  },
  removeCallback: function(id) {
    delete this.callbacks[id];
  },
  start: function() {
    this.interval = setInterval(tick, tickInterval, this);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

module.exports = tickerObj;
