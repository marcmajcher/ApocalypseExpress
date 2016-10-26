'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');
const util = require('../util/test_utils');

var req;
var testUserCookie;

describe('Map', () => {
  before(util.rollback);
  before(() => {
    request(app)
      .post('/login').set('Accept', 'text/html')
      .send('email='+util.users.testUser.email+'&password='+util.users.testUser.password)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        testUserCookie = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");
      });
  });

  
  it('should be ok', (done) => {
    util.knex('users').where('email', util.users.testUser.email).first().then((user) => {
      // console.log("USER:",user)
      ('ok').should.equal('ok');
      done();
    });
  });

});
