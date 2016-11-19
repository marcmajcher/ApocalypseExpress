'use strict';

/* eslint-env mocha, node */

// const app = require('../app/app.js');
// const request = require('supertest');
const util = require('./_util');
const should = require('should');
const app = require('../app/app.js');
const request = require('supertest');
should.config.checkProtoEql = false;

let req;
let testUserCookie;

describe('Location', () => {
  before(util.rollback);

  it('should have all required properties for a location', (done) => {
    util.knex('locations').where('id', 1).first().then((location) => {
      location.should.deepEqual(util.locations.firstLocation);
      done();
    });
  });

  it('should return the correct data for the get location route', (done) => {
    const userLogin =
      `email=${util.users.testUser.email}&password=${util.users.testUser.password}`;

    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send(userLogin)
      .end((err, res) => {
        testUserCookie = util.getCookie(res);

        req = request(app)
          .get('/location')
          .set('Accept', 'application/json');
        req.cookies = testUserCookie;
        req.expect(200)
          .end((err2, res2) => {
            JSON.parse(res2.text).should.deepEqual(util.locations.fullLocationData);
            done();
          });
      });
  });
});
