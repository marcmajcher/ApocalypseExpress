'use strict';

/* eslint-env mocha, node */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */

const app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

let userCookie;

describe('Trip', () => {
  before(util.rollback);
  after(util.rollback);
  before((done) => {
    request(app).post('/login')
      .send(`email=${util.users.testUser.email}&password=${util.users.testUser.password}`)
      .end((err, res) => {
        userCookie = util.getCookie(res);
        done();
      });
  });

  it('should get an empty trip list', (done) => {
    const req = request(app)
      .get('/trip')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        JSON.parse(res.text).trip.length.should.equal(0);
        done();
      });
  });

  it('should be able to create a new trip', (done) => {
    const req = request(app)
      .put('/trip')
      .send('destination=2')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        JSON.parse(res.text).ok.should.be.true;  // jshint ignore:line
        util.knex('trips').first().then((data) => {
          data.sequence.should.equal(1);
          data.locationid.should.equal(2);
          data.driverid.should.equal(1);
        });
        done();
      });
  });

  it('should be able to add a destination to a trip', (done) => {
    const req = request(app)
      .patch('/trip')
      .send('destination=3')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        res.text.should.equal('ok');
        util.knex('trips').then((data) => {
          data.length.should.equal(2);
          data[1].locationid.should.equal(3);
          data[1].sequence.should.equal(2);
          done();
        });
      });
  });

  it('should be able to begin the trip', (done) => {
    const req = request(app)
      .post('/trip')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        res.text.should.equal('ok');
        util.knex('drivers').where('id', 1).first()
          .then((driver) => {
            driver.location.should.equal(2);
            done();
          });
      });
  });

  it('should be able to delete a trip', (done) => {
    const req = request(app)
      .delete('/trip')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        res.text.should.equal('ok');
        util.knex('trips').then((data) => {
          data.length.should.equal(0);
          done();
        });
      });
  });
});