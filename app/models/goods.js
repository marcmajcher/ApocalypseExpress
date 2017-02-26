'use strict';

/* eslint-env node */

const util = require('../_util');
const goodsDb = 'tradegoods';
const locationGoodsDb = 'location_goods';

exports.get = id => util.knex(goodsDb).where('id', id).first();
exports.getValue = (id, param) => util.knex.select(param).from(goodsDb).where('id', id);

exports.getByLocation = locationid => util.knex(locationGoodsDb)
  .where('locationid', locationid)
  .join(goodsDb, 'location_goods.goodid', 'tradegoods.id')
  .select('tradegoods.name', 'tradegoods.price as base',
    'location_goods.price', 'location_goods.stock', 'location_goods.capacity');
