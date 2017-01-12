'use strict';

/* eslint-env node */

const util = require('../_util');
const driverDb = 'drivers';

exports.get = id => util.knex(driverDb).where('id', id).first();

exports.getValue = (id, param) => util.knex.select(param).from(driverDb).where('id', id);

exports.insert = (driverData) => util.knex(driverDb).insert(driverData, '*');

exports.update = (id, data) =>
  util.knex(driverDb).update(data).where('id', id).returning('*');

exports.updateValue = (id, param, value) => util.knex(driverDb)
  .update(param, value).where('id', id).returning(param);
