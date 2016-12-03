'use strict';

/* eslint-env node */

exports.seed = knex => knex('vehicles').del()
  .then(() => knex('vehicles').insert({
    model: 'Default',
    size: 'medium',
    type: 'standard',
    cargocap: 4,
    passengercap: 0,
    fuelcap: 10,
    mpg: 20,
    price: 10000,
    topspeed: 55,
    armorf: 1,
    armorr: 1,
    armorb: 1,
    armorl: 1,
    tires: 'standard',
    engine: 'standard'
  }));
