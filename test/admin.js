'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

let adminCookie;
let userCookie;

describe('Admin', () => {
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

  it('should prevent non-logged-in users from getting into /admin', (done) => {
    request(app)
      .get('/admin')
      .set('Accept', 'text/html')
      .expect(500, done);
  });

  it('should prevent non-admin users from getting into /admin', (done) => {
    const req = request(app)
      .get('/admin')
      .set('Accept', 'text/html');
    req.cookies = userCookie;
    req.expect(500, done);
  });

  it('should allow admin users to hit the dashboard', (done) => {
    const req = request(app)
      .get('/admin')
      .set('Accept', 'text/html');
    req.cookies = adminCookie;
    req.expect(200)
      .expect('Content-Type', /text/)
      .end((err2, res2) => {
        res2.text.should.match(/ApoX Admin/);
        done();
      });
  });

  it('should return full map data for a logged in admin', (done) => {
    const req = request(app)
      .get('/map')
      .set('Accept', 'text/json');
    req.cookies = adminCookie;
    req.expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        const cities = res.body.locations;
        const links = res.body.connections;
        cities[1].name.should.equal('Garnet');
        cities[2].name.should.equal('Amethyst');
        cities[3].name.should.equal('Pearl');
        links.length.should.equal(3); // eslint-disable-line no-magic-numbers
        done();
      });
  });

  it('should allow an admin to edit a map location', (done) => {
    const req = request(app)
      .patch('/admin/map/location/2')
      .set('Accept', 'text/json');
    req.cookies = adminCookie;
    req.send(util.locations.editLocation)
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.body.status.should.equal('ok');
        done();
      });
  });

  it('should not allow a non-admin user to edit a map location', (done) => {
    const req = request(app)
      .patch('/admin/map/locaion/2')
      .set('Accept', 'text/json');
    req.cookies = userCookie;
    req.send(util.locations.editLocation)
      .expect(500, done);
  });
});
