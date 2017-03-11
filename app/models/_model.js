'use strict';

/* eslint-env node */

const util = require('../_util');

module.exports = function Model(db) {
  return {
    list: () => util.knex(db),

    get: id => util.knex(db).where('id', id).first(),

    getValue: (id, param) => util.knex.select(param).from(db).where('id', id),

    create: data => util.knex(db).insert(data, '*'),

    update: (id, data) =>
      util.knex(db).update(data).where('id', id).returning('*'),

    updateValue: (id, param, value) => util.knex(db)
      .update(param, value).where('id', id).returning(param)
  };
};
