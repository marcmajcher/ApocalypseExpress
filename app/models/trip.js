'use strict';

/* eslint-env node */

const util = require('../_util');

exports.get = driverid => util.knex('trips').where('driverid', driverid)
  .join('locations', 'trips.locationid', 'locations.id')
  .select('trips.locationid', 'locations.name', 'trips.sequence')
  .orderBy('sequence');

exports.del = driverid => util.knex('trips').where('driverid', driverid).del();
