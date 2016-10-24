'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');
const util = require('../util/test_utils');

var req;

describe('Map', () => {
  before(util.rollback);

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

    xit('should not allow user that is not logged in to see map data', (done) => {

    });

    xit('should return correct map data for a logged in user', (done) => {

    });
  });

});
