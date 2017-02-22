'use strict';

/* eslint-env node */

const goodsByName = {};
const inserts = [];

function getInsert(good, loc) {
  const demandBase = loc.population * (good.rarity / 100);
  const demand = Math.round(demandBase + (demandBase * Math.random() - 0.5));
  const productionBase = loc.population * (good.rarity / 100);
  const production = Math.round(productionBase + (productionBase * Math.random() - 0.5));
  const capacityBase = loc.population * (good.rarity / 100);
  const capacity = Math.round(capacityBase + (capacityBase * Math.random() - 0.5));
  const stock = Math.round(capacity * Math.random());

  const volumeMod = Math.log10(Math.max(1, demand - Math.max(1, demand - production))) * 0.01;
  const rarityMod = (1 - (stock / Math.max(1, capacity))) / 10;
  const flow = production - demand;
  const flowBase = (flow > 0) ? 0.9 - Math.log10(flow) * 0.03 :
    (flow < 0) ? 0.9 + Math.log10(demand - production) * 0.06 : 0.9;
  const modifier = flowBase + rarityMod - volumeMod + 0.05;
  const price = Math.ceil(good.price * modifier);

  return {
    goodid: good.id,
    locationid: loc.id,
    price,
    modifier,
    stock,
    capacity,
    demand,
    production
  };
}

exports.seed = knex => knex('location_goods').del()
  .then(() => knex('tradegoods'))
  .then((goods) => {
    goods.forEach((good) => {
      goodsByName[good.name] = good;
    });
    return knex('locations');
  })
  .then((locations) => {
    const goods = Object.values(goodsByName);
    locations.forEach((loc) => {
      goods.filter((e) => e.mintech <= loc.tech)
        .filter((e) => Math.floor(Math.random() * 100) <= e.rarity)
        .forEach((good) => {
          inserts.push(getInsert(good, loc));
        });
    });
    return knex('location_goods').insert(inserts);
  });
