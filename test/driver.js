'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const should = require('should');
const util = require('./_util');
const defaultMoney = 0;
const defaultHealth = 100;

let req;
let driverUserCookie;

describe('Driver', () => {
  before(util.rollback);

  it('should register a new user, which has a driver with a default location', (done) => {
    request(app)
      .post('/user')
      .set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.driverUser))
      .expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        util.knex('users').where('email', util.users.driverUser.email)
          .first().then((user) => {
            util.knex('config').where('config', 'default').first().then(
              (config) => {
                util.knex('drivers').where('id', user.driverid).first()
                  .then((driver) => {
                    driver.location.should.equal(config.defaultLocation);
                    driver.health.should.equal(defaultHealth);
                    driver.money.should.equal(defaultMoney);
                    should.exist(driver.name); //  eslint-disable-line no-unused-expressions
                    done();
                  });
              });
          });
      });
  });

  it('should log in a new user', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send(
        `email=${util.users.driverUser.email}&password=${util.users.driverUser.password}`)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        driverUserCookie = util.getCookie(res);
        done();
      });
  });

  it('should display the default location on the game page for a new user', (done) => {
    req = request(app)
      .get('/game')
      .set('Accept', 'text/html');
    req.cookies = driverUserCookie;
    req
      .expect(200)
      .end((err, res) => {
        res.text.should.match(/Garnet/);
        done();
      });
  });
});
