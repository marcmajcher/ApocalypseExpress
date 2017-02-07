'use strict';

/* eslint-env node */

const util = require('../_util');
const vehicleDb = 'vehicles';

exports.defaultVehicle = {
  model: 'Default',
  size: 'medium',
  type: 'standard',
  cargocap: 4,
  passengercap: 0,
  fuelcap: 10,
  mpg: 20,
  price: 10000,
  topspeed: 70,
  armorf: 1,
  armorr: 1,
  armorb: 1,
  armorl: 1,
  tires: 'standard',
  engine: 'standard'
};

exports.get = id => util.knex(vehicleDb).where('id', id).first();

exports.create = vehicleData => util.knex(vehicleDb).insert(vehicleData, '*');
exports.createDefault = () => exports.create(exports.defaultVehicle);
