'use strict';

/* eslint-env mocha, node */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-expressions: "off" */

const app = require('../app/app.js').app;
const request = require('supertest');
const util = require('./_util');
const Trip = require('../app/models/trip');

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

  it('should not be possible to create a new trip to a non-adjacent location', (done) => {
    const req = request(app)
      .put('/trip')
      .send('destination=4')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(500, done);
  });

  it('should be able to create a new trip', (done) => {
    const req = request(app)
      .put('/trip')
      .send('destination=2')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        JSON.parse(res.text).ok.should.be.true; // jshint ignore:line
        util.knex('trips').first().then((data) => {
          data.driverid.should.equal(1);
          data.startid.should.equal(1);
          data.destinationid.should.equal(2);
          data.distance.should.equal(97154);
          data.underway.should.equal(false);
          data.speed.should.equal(70);
          done();
        });
      });
  });

  it('should have the correct distance for a trip', (done) => {
    util.knex('trips').where('driverid', 1).first().then((trip) => {
      trip.distance.should.equal(97154);
      done();
    });
  });

  it('should be able to begin the trip', (done) => {
    const req = request(app)
      .post('/trip/go')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        util.knex('trips').where('driverid', 1).first()
          .then((trip) => {
            trip.underway.should.be.true; // jshint ignore:line
            res.text.should.equal('ok');
            done();
          });
      });
  });

  // should be in traveling state for x turn
  // should not be traveling after enough x turns
  // util.knex('drivers').where('id', 1).first()
  //   .then((driver) => {
  //     driver.location.should.equal(2);
  //     util.knex('trips').then((data) => {
  //       data.length.should.equal(0);
  //       done();
  //     });
  //   });

  it('should record the trip as visited', (done) => {
    Trip.tick(true).then(() => {
      util.knex('driver_visited').where('driverid', 1)
        .then((visited) => {
          visited.length.should.equal(2);
          done();
        });
    });
  });

  it('should not record the same destination as visited more than once', (done) => {
    let req = request(app)
      .put('/trip')
      .send('destination=1')
      .set('Accept', 'application/json');
    req.cookies = userCookie;
    req.expect(200)
      .end((err, res) => {
        JSON.parse(res.text).ok.should.be.true; // jshint ignore:line
        req = request(app)
          .post('/trip/go')
          .set('Accept', 'application/json');
        req.cookies = userCookie;
        req.expect(200)
          .end((err2, res2) => {
            res2.text.should.equal('ok');
            Trip.tick(true).then(() => {
              util.knex('drivers').where('id', 1).first()
                .then((driver) => {
                  driver.location.should.equal(1);
                  util.knex('driver_visited').where('driverid', 1)
                    .then((visited) => {
                      visited.length.should.equal(2);
                      done();
                    });
                });
            });
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
