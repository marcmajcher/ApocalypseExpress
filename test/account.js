'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const should = require('should');
const util = require('./_util');
const bcrypt = require('bcrypt-as-promised');

let testUserCookie;
let req;

// move to protractor - test routes instead

describe('Login', () => {
  before(util.rollback);
  after(util.rollback);

  it('home page should have login form if not logged in', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/action="\/login/);
        done();
      });
  });

  it('should be able to log in a test user and redirect to game', (done) => {
    const userLogin =
      `email=${util.users.testUser.email}&password=${util.users.testUser.password}`;
    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send(userLogin)
      .expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        testUserCookie = util.getCookie(res);
        done();
      });
  });

  it('home page should not have login form if logged in', (done) => {
    req = request(app)
      .get('/')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.not.match(/action="\/login/);
        done();
      });
  });

  it('should redirect logged in user to game page from home', (done) => {
    req = request(app)
      .get('/')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req.expect(302)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        done();
      });
  });

  it('game page should have logout link if logged in', (done) => {
    req = request(app)
      .get('/game')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/href="\/logout/);
        done();
      });
  });

  it('game page should greet player by first name', (done) => {
    req = request(app)
      .get('/game')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(new RegExp(util.users.testUser.firstName));
        done();
      });
  });

  it('registration should redirect a logged in user to the game page', (done) => {
    req = request(app)
      .get('/register')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req
      .expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/game');
        done();
      });
  });

  it('should log user out', (done) => {
    req = request(app)
      .get('/logout')
      .set('Accept', 'text/html');
    req.cookies = testUserCookie;
    req
      .expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        res.headers['set-cookie'][0].should.match(/session=;/);

        request(app)
          .get('/')
          .expect(200)
          .end((err2, res2) => {
            res2.text.should.match(/action="\/login/);
            done();
          });
      });
  });
});

describe('Registration', () => {
  before(util.rollback);
  after(util.rollback);

  it('home page should have a registration link if not logged in', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/href="\/register/);
        done();
      });
  });

  it(
    'should be able to register a new player account and redirect to home page', (done) => {
      request(app)
        .post('/user')
        .set('Accept', 'text/html')
        .send(util.getRegistrationParams(util.users.newUser))
        .expect(302)
        .expect('Content-Type', /text/)
        .end((err, res) => {
          res.headers.location.should.equal('/');
          done();
        });
    });

  it('newly registered user should have all fields saved', (done) => {
    util.knex('users').where('email', util.users.newUser.email).first()
      .then((user) => {
        user.email.should.equal(util.users.newUser.email);
        user.firstname.should.equal(util.users.newUser.firstName);
        user.lastname.should.equal(util.users.newUser.lastName);
        done();
      });
  });

  it('new accounts should have the player role', (done) => {
    util.knex('users').where('email', util.users.newUser.email).first()
      .then((user) => {
        user.role.should.equal('player');
        done();
      });
  });

  const regParams = [
    ['garbage1@gmail.com', 'password', 'firstname', ''],
    ['garbage2@gmail.com', 'password', '', 'lastname'],
    ['garbage3@gmail.com', '', 'fistname', 'lastname'],
    ['', 'password', 'firstname', 'lastname']
  ];

  function regParamIt(params) {
    it(`registration should require all params, fail with ${params.join(', ')}`, (done) => {
      request(app)
        .post('/user')
        .set('Accept', 'text/html')
        .send(util.getRegistrationParams({
          email: params[0],
          password: params[1],
          firstName: params[2],
          lastName: params[3]
        }))
        .expect(500, done);
    });
  }

  for (let i = 0; i < regParams.length; i++) {
    regParamIt(regParams[i]);
  }

  it('registration should reject an existing email address', (done) => {
    request(app)
      .post('/user')
      .set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.newUser))
      .expect(500, done);
  });

  it('registration should fail if passwords do not match', (done) => {
    request(app)
      .post('/user')
      .set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.badPassUser))
      .expect(500)
      .end(() => {
        util.knex('users').where('email', util.users.badPassUser.email)
          .first().then((user) => {
            should.equal(user, undefined);
            done();
          });
      });
  });

  it('registration should fail if emails do not match', (done) => {
    request(app)
      .post('/user')
      .set('Accept', 'text/html')
      .send(util.getRegistrationParams(util.users.badEmailUser))
      .expect(500)
      .end(() => {
        util.knex('users').where('email', util.users.badEmailUser.email)
          .first().then((user) => {
            should.equal(user, undefined);
            done();
          });
      });
  });

  describe('Account', () => {
    it('should only allow logged in users to access account management page', (done) => {
      request(app)
        .get('/user/account')
        .expect(304)
        .end((err, res) => {
          res.headers.location.should.equal('/');
          done();
        });
    });

    it('should have a page to allow users to manage their account if logged in', (done) => {
      req = request(app)
        .get('/user/account')
        .set('Accept', 'text/html');
      req.cookies = testUserCookie;
      req
        .expect(200)
        .expect('Content-Type', /text/, done);
    });

    it('should allow a user to change their first and last name', (done) => {
      req = request(app)
        .patch('/user/account')
        .set('Accept', 'text/html');
      req.cookies = testUserCookie;
      req
        .send({
          firstname: util.users.newUser.firstName,
          lastname: util.users.newUser.lastName,
        })
        .expect(200)
        .expect('Content-Type', /text/)
        .end(() => {
          util.knex('users').where('email', util.users.testUser.email).first()
            .then((user) => {
              user.firstname.should.equal(util.users.newUser.firstName);
              user.lastname.should.equal(util.users.newUser.lastName);
              done();
            });
        });
    });

    it('should allow a user to change their password', (done) => {
      req = request(app)
        .patch('/user/account')
        .set('Accept', 'text/html');
      req.cookies = testUserCookie;
      req
        .send({
          cpassword: util.users.testUser.password,
          password: util.users.newUser.password,
          vpassword: util.users.newUser.password
        })
        .expect(200)
        .expect('Content-Type', /text/)
        .end(() => {
          util.knex('users').where('email', util.users.testUser.email)
            .first().then((user) => {
              bcrypt.compare(util.users.newUser.password, user.hashedPassword)
                .then(() => {
                  should.ok(util.users.newUser.password);
                  done();
                })
                .catch(() => {
                  should.fail(util.users.newUser.password,
                    util.users.testUser.password,
                    'Passwords did not match');
                  done();
                });
            });
        });
    });

    it('should require a user to enter their current password to change it', (done) => {
      req = request(app)
        .patch('/user/account')
        .set('Accept', 'text/html');
      req.cookies = testUserCookie;
      req
        .send({
          cpassword: util.users.badPassUser.password,
          password: util.users.newUser.password,
          vpassword: util.users.newUser.password
        })
        .expect(304)
        .end((err, res) => {
          res.headers.location.should.equal('/user/account');
          done();
        });
    });
  });
});