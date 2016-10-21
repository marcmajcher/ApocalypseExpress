'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');

const config = require('../knexfile')['test'];
const knex = require('knex')(config);

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@gmail.com',
  password: 'test'
}
const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@gmail.com',
  password: 'admin'
};
var cookieJar;
var req;

function rollback(done) {
  knex.migrate.rollback().then(() => {
    knex.migrate.latest().then(() => {
      return knex.seed.run().then(() => {
        done();
      });
    });
  });
}

describe('Admin', () => {
  before(rollback);

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
      .send('email='+testUser.email+'&password='+testUser.password)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        cookieJar = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");

        req = request(app).get('/admin').set('Accept', 'text/html');
        req.cookies = cookieJar;
        req.expect(302).expect('Content-Type', /text/)
          .end((err, res) => {
            res.headers.location.should.equal('/');
            done();
          });
      });
  });

  it('should allow admin users to hit the dashboard', (done) => {
    request(app).post('/login').set('Accept', 'text/html')
      .send('email='+adminUser.email+'&password='+adminUser.password)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        cookieJar = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");
        req = request(app).get('/admin').set('Accept', 'text/html');
        req.cookies = cookieJar;
        req.expect(200).expect('Content-Type', /text/)
          .end((err, res) => {
            res.text.should.match(/ApoX Admin/);
            done();
          });
      })

  });

});
