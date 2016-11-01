'use strict';

var app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

var adminCookie, userCookie;
var req;

describe('Admin', () => {
  before(util.rollback);

  it('should prevent non-logged-in users from getting into /admin', (done) => {
    request(app).get('/admin').set('Accept', 'text/html')
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        done();
      });
  });

  it('should prevent non-admin users from getting into /admin', (done) => {
    request(app).post('/login').set('Accept', 'text/html')
      .send('email=' + util.users.testUser.email + '&password=' + util.users.testUser.password)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        userCookie = util.getCookie(res);

        req = request(app).get('/admin').set('Accept', 'text/html');
        req.cookies = userCookie;
        req.expect(302).expect('Content-Type', /text/)
          .end((err, res) => {
            res.headers.location.should.equal('/');
            done();
          });
      });
  });

  it('should allow admin users to hit the dashboard', (done) => {
    request(app).post('/login').set('Accept', 'text/html')
      .send('email=' + util.users.adminUser.email + '&password=' + util.users.adminUser.password)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        adminCookie = util.getCookie(res);
        req = request(app).get('/admin').set('Accept', 'text/html');
        req.cookies = adminCookie;
        req.expect(200).expect('Content-Type', /text/)
          .end((err, res) => {
            res.text.should.match(/ApoX Admin/);
            done();
          });
      });
  });

});
