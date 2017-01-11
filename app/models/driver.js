'use strict';

/* eslint-env node */

const util = require('../_util');

exports.get = id => util.knex('drivers').where('id', id).first();

exports.getValue = (id, param) => util.knex.select(param).from('drivers').where('id', id);

exports.update = (id, data) =>
  util.knex('drivers').update(data).where('id', id).returning('*');

exports.updateValue = (id, param, value) => util.knex('drivers')
  .update(param, value).where('id', id).returning(param);
