'use strict';

/* eslint-env node */

const util = require('../_util');
const vehicleDb = 'vehicles';

const defaultVehicle = {
  model: 'Junker',
  size: 'small',
  type: 'compact',
  cargocap: 4,
  passengercap: 0,
  fuelcap: 10,
  kmpl: 10,
  price: 2000,
  topspeed: 70,
  armor: 1,
  tires: 'standard',
  engine: 'standard'
};

const junkerNames = ['Mule', 'Donkey', 'Burro', 'Jack', 'Hinny', 'Jennet', 'Molly', 'John', 'Jule'];

exports.get = id => util.knex(vehicleDb).where('id', id).first();

exports.create = vehicleData => util.knex(vehicleDb).insert(vehicleData, '*');
exports.createDefault = () => {
  const vehicleData = JSON.parse(JSON.stringify(defaultVehicle));
  /* eslint-disable */
  vehicleData.name =
    `${junkerNames[Math.floor(Math.random()*junkerNames.length)]}${Math.floor(Math.random()*7000)+1000}`;
  /* eslint-enable */
  return exports.create(vehicleData);
};
