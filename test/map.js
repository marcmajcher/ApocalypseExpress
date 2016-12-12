'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

let adminCookie;
let userCookie;

// move to protractor - test routes instead

describe('Map', () => {
  before(util.rollback);
  before((done) => {
    request(app).post('/login')
      .send(`email=${util.users.testUser.email}&password=${util.users.testUser.password}`)
      .end((err, res) => {
        userCookie = util.getCookie(res);
        done();
      });
  });
  before((done) => {
    request(app).post('/login')
      .send(`email=${util.users.adminUser.email}&password=${util.users.adminUser.password}`)
      .end((err, res) => {
        adminCookie = util.getCookie(res);
        done();
      });
  });
  after(util.rollback);

  it('should not allow user that is not logged in to see map data', (done) => {
    request(app)
      .get('/map')
      .expect(302, done);
  });

  it('should return correct map data for a logged in user', (done) => {
    const req = request(app)
      .get('/map')
      .set('Accept', 'text/json');
    req.cookies = userCookie;
    req.expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        const cities = res.body.locations;
        const links = res.body.connections;
        cities[1].name.should.equal('Garnet');
        cities[2].name.should.equal('Amethyst');
        cities[3].name.should.equal('Pearl');
        (typeof cities[4]).should.equal('undefined');
        links.length.should.equal(2); // eslint-disable-line no-magic-numbers
        done();
      });
  });

  it('should get map data from /map for admin', (done) => {
    const req = request(app)
      .get('/map')
      .set('Accept', 'text/json');
    req.cookies = adminCookie;
    req.expect(200)
      .expect('Content-Type', /text/)
      .end((err2, res2) => {
        const cities = res2.body.locations;
        const links = res2.body.connections;
        cities[1].name.should.equal('Garnet');
        cities[2].name.should.equal('Amethyst');
        cities[3].name.should.equal('Pearl');
        links.length.should.equal(8); // eslint-disable-line no-magic-numbers
        done();
      });
  });
});
