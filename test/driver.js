'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');
const util = require('../util/test_utils');

var req;
var driverUserCookie;

describe('Driver', () => {
  before(util.rollback);

  it('should register a new user, which has a driver with a default location', (done) => {
    request(app).post('/user').set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.driverUser))
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        util.knex('users').where('email', util.users.driverUser.email).first().then((user) => {
          util.knex('config').where('config', 'default').first().then((config) => {
            util.knex('drivers').where('id', user.driverid).first().then((driver) => {
              driver.location.should.equal(config.defaultLocation);
              driver.health.should.equal(100);
              driver.money.should.equal(0);
              driver.name.should.exist;
              done();
            });
          });
        });
      });
  });

  it('should log in a new user', (done) => {
    request(app)
      .post('/login').set('Accept', 'text/html')
      .send('email='+util.users.driverUser.email+'&password='+util.users.driverUser.password)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        driverUserCookie = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");
        done();
      });
  });

  it('should display the default location on the game page for a new user', (done) => {
    req = request(app).get('/game').set('Accept', 'text/html');
    req.cookies = driverUserCookie;
    req.expect(200).end((err, res) => {
      res.text.should.match(/Garnet/);
      done();
    });
  });

});
