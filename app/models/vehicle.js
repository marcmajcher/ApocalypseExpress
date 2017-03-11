'use strict';

/* eslint-env node */

const Model = require('./_model');
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

const Vehicle = new Model(vehicleDb);

Vehicle.createDefault = () => {
  const vehicleData = JSON.parse(JSON.stringify(defaultVehicle));
  /* eslint-disable */
  vehicleData.name =
    `${junkerNames[Math.floor(Math.random()*junkerNames.length)]}${Math.floor(Math.random()*7000)+1000}`;
  /* eslint-enable */
  return Vehicle.create(vehicleData);
};

module.exports = Vehicle;
