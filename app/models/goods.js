'use strict';

/* eslint-env node */

const util = require('../_util');
const goodsDb = 'tradegoods';
const locationGoodsDb = 'location_goods';
const Model = require('./_model');

const Goods = new Model(goodsDb);

Goods.getByLocation = locationid => util.knex(locationGoodsDb)
  .where('locationid', locationid)
  .join(goodsDb, 'location_goods.goodid', 'tradegoods.id')
  .select('tradegoods.name', 'tradegoods.price as base',
    'location_goods.price', 'location_goods.stock', 'location_goods.capacity');

module.exports = Goods;
