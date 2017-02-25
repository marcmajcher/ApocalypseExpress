'use strict';

/* eslint-env node */

const util = require('../_util');
const goodsDb = 'goods';

exports.get = id => util.knex(goodsDb).where('id', id).first();
exports.getValue = (id, param) => util.knex.select(param).from(goodsDb).where('id', id);

// TODO: get goods by location
