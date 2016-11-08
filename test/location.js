'use strict';

/* eslint-env mocha, node */

// const app = require('../app/app.js');
// const request = require('supertest');
const util = require('./_util');
const should = require('should');
should.config.checkProtoEql = false;

// let req;

describe('Location', () => {
  before(util.rollback);

  it('should have all required properties for a location', (done) => {
    util.knex('locations').where('id', 1).first().then((location) => {
      location.should.deepEqual(util.locations.firstLocation);
      done();
    });
  });
});
