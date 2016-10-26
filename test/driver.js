'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');
const util = require('../util/test_utils');

var req;
var testUserCookie;

describe('Driver', () => {
  before(util.rollback);
  // before(() => {
  //   request(app)
  //     .post('/login').set('Accept', 'text/html')
  //     .send('email='+util.users.driverUser.email+'&password='+util.users.driverUser.password)
  //     .end((err, res) => {
  //       res.headers.location.should.equal('/');
  //       testUserCookie = res.headers['set-cookie'].map((r)=>{
  //             return r.replace("; path=/; httponly","")
  //           }).join("; ");
  //     });
  // });

  it('should be ok', (done) => {
    util.knex('users').where('email', util.users.driverUser.email).first().then((user) => {
      ('ok').should.equal('ok');
      // console.log("USER:",user);
      done();
    });
  });

  it('should register a new user, which has a driver with a default location', (done) => {
    request(app).post('/user').set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.driverUser))
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        util.knex('users').where('email', util.users.driverUser.email).first().then((user) => {
          util.knex('config').where('config', 'default').first().then((config) => {
            util.knex('drivers').where('id', user.driverid).first().then((driver) => {
              driver.id.should.equal(config.defaultLocation);
              done();
            });
          });
        });
      });
  });

});
