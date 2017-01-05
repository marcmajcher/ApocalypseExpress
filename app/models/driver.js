'use strict';

/* eslint-env node */

const util = require('../_util');

exports.get = id => util.knex('drivers').where('id', id).first();
