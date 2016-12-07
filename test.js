'use strict';

const config = require('./knexfile').development;
const knex = require('knex')(config);

const driver = 1;
const loc = 1;

knex('driver_visited')
  .whereNotExists(knex('driver_visited')
    .whereRaw(`locationid=${loc} and driverid=${driver}`)
  )
  .insert({
    locationid: loc,
    driverid: driver
  }, '*')
  .then((data) => {
    console.log(data);
    process.exit();
  });


// insert into driver_visited (locationid, driverid)
// select 2,1
//where not exists (select * from driver_visited where locationid=2 and driverid=1);
