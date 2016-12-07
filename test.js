'use strict';

const config = require('./knexfile').development;
const knex = require('knex')(config);

const myData = {};

knex('locations').where('id',
  knex('drivers').where('id', 1).select('location')).first()
  .then((location) => {
    knex('connections').where('start', location.id)
      .then((connections) => {
        console.log(connections);
        process.exit();
      });
  });
