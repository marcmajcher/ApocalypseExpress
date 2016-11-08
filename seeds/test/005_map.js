'use strict';

/* eslint-env node */

const locations = [{
  name: 'Garnet',
  latitude: '32.4487364',
  longitude: '-99.7331439'
}, {
  name: 'Amethyst',
  latitude: '32.5264993',
  longitude: '-101.71597'
}, {
  name: 'Pearl',
  latitude: '27.7522487',
  longitude: '-98.0697249'
}];

const connections = [{
  loc1: 2,
  loc2: 1,
  distance: 97154
}, {
  loc1: 1,
  loc2: 3,
  distance: 94887
}, {
  loc1: 3,
  loc2: 2,
  distance: 97154
}];

exports.seed = knex =>
  knex('locations').del()
  .then(() => knex('locations').insert(locations))
  .then(() => knex('connections').insert(connections));
