'use strict';

/* eslint-env node */

const config = {
  locations: [{
    name: 'Garnet',
    latitude: 30.2971,
    longitude: -97.7391,
    description: 'This is a location.',
    population: 1000,
    type: 'hold',
    tech: 5,
    factionid: 0
  }, {
    name: 'Amethyst',
    latitude: 29.9221,
    longitude: -97.9325,
    description: 'This is a location.',
    population: 1000,
    type: 'hold',
    tech: 5,
    factionid: 0
  }, {
    name: 'Pearl',
    latitude: 30.1489,
    longitude: -97.307,
    description: 'This is a location.',
    population: 1000,
    type: 'hold',
    tech: 5,
    factionid: 0
  }, {
    name: 'Steven',
    latitude: 30.6,
    longitude: -97,
    description: 'Human-Gem hybrid',
    population: 716512,
    type: 'freehold',
    tech: 8,
    factionid: 1
  }],
  connections: [{
      start: 1,
      end: 2,
      distance: 97154
    }, {
      start: 1,
      end: 3,
      distance: 94887
    }, {
      start: 2,
      end: 1,
      distance: 97154
    }, {
      start: 2,
      end: 3,
      distance: 97154
    }, {
      start: 3,
      end: 1,
      distance: 97154
    }, {
      start: 3,
      end: 2,
      distance: 97154
    }, {
      start: 3,
      end: 4,
      distance: 19212
    }, {
      start: 4,
      end: 3,
      distance: 19281
    }

  ]
};

exports.seed = knex =>
  knex('locations').del()
  .then(() => knex('locations').insert(config.locations))
  .then(() => knex('connections').insert(config.connections));
