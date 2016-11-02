'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.renameTable('city_link', 'connections');
exports.down = knex => knex.schema.renameTable('connections', 'city_link');
