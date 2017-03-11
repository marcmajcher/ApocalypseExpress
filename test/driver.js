'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js').app;
const request = require('supertest');
const should = require('should');
const util = require('./_util');
const defaultMoney = 0;
const defaultHealth = 100;

describe('Driver', () => {
  before(util.rollback);

  xit('should register a new user, which has a driver with a default location', (done) => {
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
});
