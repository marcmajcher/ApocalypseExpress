'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');
const config = require('../knexfile')['test'];
const knex = require('knex')(config);

var req;

function rollback(done) {
  knex.migrate.rollback().then(() => {
    knex.migrate.latest().then(() => {
      return knex.seed.run().then(() => {
        done();
      });
    });
  });
}

describe('Map', () => {
  before(rollback);

  it('should get map data from /map', (done) => {
    request(app).get('/map').set('Accept', 'text/json')
      .expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        var cities = res.body.locations;
        var links = res.body.connections;
        cities[1].name.should.equal('Garnet');
        cities[2].name.should.equal('Amethyst');
        cities[3].name.should.equal('Pearl');
        links.length.should.equal(3);
        done();
      });
  });

});
