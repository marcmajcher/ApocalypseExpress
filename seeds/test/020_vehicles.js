'use strict';

/* eslint-env node */

const Vehicle = require('../../app/models/vehicle');

exports.seed = knex => knex('vehicles').del()
  .then(() => Vehicle.create(Vehicle.defaultVehicle));
