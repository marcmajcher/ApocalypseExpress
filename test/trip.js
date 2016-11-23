'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const should = require('should');
const util = require('./_util');

describe('Trip', () => {
  before(util.rollback);
  after(util.rollback);

  let testUserCookie;
  let req;

  it('should get an empty trip list', (done) => {

    const userLogin =
      `email=${util.users.testUser.email}&password=${util.users.testUser.password}`;

    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send(userLogin)
      .end((err, res) => {
        testUserCookie = util.getCookie(res);

        req = request(app)
          .get('/trip')
          .set('Accept', 'application/json');
        req.cookies = testUserCookie;
        req.expect(200)
          .end((err2, res2) => {
            JSON.parse(res2.text).trip.length.should.equal(0);
            done();
          });
      });


  });
});
