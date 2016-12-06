'use strict';

const config = require('./knexfile').development;
const knex = require('knex')(config);

const myData = {};

knex('locations').innerJoin('driver_visited', {
  'locations.id': 'driver_visited.locationid',
  'driver_visited.driverid': 1
}).select('id', 'name', 'latitude', 'longitude', 'population', 'tech', 'factionid', 'type')

.then((locations) => {

  myData.locations = locations.reduce((last, cur) => {
    last[cur.id] = cur;
    return last;
  }, {});

  console.log(myData);
  process.exit();
});
