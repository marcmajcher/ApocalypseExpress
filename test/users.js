'use strict';

const app = require('../app.js');
const request = require('supertest');
const should = require('should');

const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  screenName: 'The User Who Tests',
  email: 'test@gmail.com',
  password: 'test'
}
const newUser = {
  firstName: 'Test2',
  lastName: 'User2',
  screenName: 'The Second User',
  email: 'test2@gmail.com',
  password: 'test'
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

describe('Login', () => {
  before(rollback);

  it('home page should have login form if not logged in', (done) => {
    request(app).get('/').set('Accept', 'text/html')
      .expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/action="\/login/);
        done();
      });
  });

  it('should be able to log in a test user and redirect to index', (done) => {
    request(app)
      .post('/login').set('Accept', 'text/html')
      .send('email='+testUser.email+'&password='+testUser.password)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        cookieJar = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");
        done();
      });
  });

  it('home page should not have login form if logged in', (done) => {
    req = request(app).get('/').set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.not.match(/action="\/login/);
        done();
      });
  });

  it('home page should have logout link if logged in', (done) => {
    req = request(app).get('/').set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/href="\/logout/);
        done();
      })
  });

  it('home page should greet player by first name', (done) => {
    req = request(app).get('/').set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(new RegExp('/' + testUser.firstName + '/'));
        done();
      })
  });

  it('registration should redirect a logged in user to the home page', (done) => {
    req = request(app).get('/').set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(302).expect('Content-Type', /text/)
    .end((err, res) => {
      res.headers.location.should.equal('/');
      done();
    });
  });

  it('should log user out', (done) => {
    req = request(app).get('/logout').set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        res.headers['set-cookie'][0].should.match(/session=;/);

        request(app).get('/').expect(200)
          .end((err, res) => {
            res.text.should.match(/action="\/login/);
            done();
          });
      });

  });
});

describe('Registration', () => {
  before(rollback);

  it('home page should have a registration link if not logged in', (done) => {
    request(app).get('/').set('Accept', 'text/html')
      .expect(200).expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.match(/href="\/register/);
        done();
      });
  });

  it('should be able to register a new player account and redirect to home page', (done) => {
    request(app)
      .post('/register').set('Accept', 'text/html')
      .send('email='+newUser.email+'&password='+newUser.password+'&firstname='+newUser.firstName+'&lastname='+newUser.lastName)
      .expect(302).expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        done();
      });
  });

  const regParams = [ ['garbage1@gmail.com', 'password', 'firstname', ''],
                      ['garbage2@gmail.com', 'password', '', 'lastname'],
                      ['garbage3@gmail.com', '', 'fistname', 'lastname'],
                      ['', 'password', 'firstname', 'lastname'] ];
  function regParamIt(params) {
    it('registration should require all params, fail with '+params.join(', '), (done) => {
        request(app).post('/register').set('Accept', 'text/html')
          .send('email='+params[0]+'&password='+params[1]+'&firstname='+params[2]+'&lastname='+params[3])
          .expect(500, done);
    });
  }

  for (var i=0; i<regParams.length; i++) {
    regParamIt(regParams[i]);
  }

  it('registration should reject an existing email address', (done) => {
    request(app)
      .post('/register').set('Accept', 'text/html')
      .send('email='+newUser.email+'&password='+newUser.password+'&firstname='+newUser.firstName+'&lastname='+newUser.lastName)
      .expect(500, done);
  });

  it('new accounts should have the player role', (done) => {
      knex('users').where('email', newUser.email).first().then((user) => {
        user.role.should.equal('player');
        done();
      });
  });

});
