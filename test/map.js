'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

let req;

// move to protractor - test routes instead

describe('Map', () => {
  before(util.rollback);
  after(util.rollback);

  it('should not allow user that is not logged in to see map data', (done) => {
    request(app)
      .get('/map')
      .expect(302, done);
  });

  xit('should return correct map data for a logged in user', (done) => {
    request(app)
      .get('/map')
      .set('Accept', 'text/json')
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        const cities = res.body.locations;
        const links = res.body.connections;
        cities[1].name.should.equal('Garnet');
        (typeof cities[2]).should.equal('undefined');
        (typeof cities[3]).should.equal('undefined');
        links.length.should.equal(2); // eslint-disable-line no-magic-numbers
        done();
      });
  });

  it('should get map data from /map for admin', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send(
        `email=${util.users.adminUser.email}&password=${util.users.adminUser.password}`)
      .expect(304)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        const adminCookie = util.getCookie(res);
        req = request(app).get('/map').set('Accept', 'text/html');
        req.cookies = adminCookie;
        req
          .expect(200)
          .expect('Content-Type', /text/)
          .end((err2, res2) => {
            const cities = res2.body.locations;
            const links = res2.body.connections;
            cities[1].name.should.equal('Garnet');
            cities[2].name.should.equal('Amethyst');
            cities[3].name.should.equal('Pearl');
            links.length.should.equal(3); // eslint-disable-line no-magic-numbers
            done();
          });
      });
  });
});
