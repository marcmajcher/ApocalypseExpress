var app = require('../app.js');
var request = require('supertest');
var should = require('should');

describe('Login', () => {

  var cookieJar;
  var req;

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

  it('should be able to log in a test user and redirect to index', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'text/html')
      .send('email=test@gmail.com&password=test')
      .expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        cookieJar = res.headers['set-cookie'].map((r)=>{
              return r.replace("; path=/; httponly","")
            }).join("; ");
        done();
      });
  });

  it('home page should not have login form if logged in', (done) => {
    req = request(app)
      .get('/')
      .set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.text.should.not.match(/action="\/login/);
        done();
      });
  });

  it('should log user out', (done) => {
    req = request(app)
      .get('/logout')
      .set('Accept', 'text/html');
    req.cookies = cookieJar;
    req.expect(302)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        res.headers.location.should.equal('/');
        res.headers['set-cookie'][0].should.match(/session=;/);

        request(app)
          .get('/')
          .expect(200)
          .end((err, res) => {
            res.text.should.match(/action="\/login/);
            done();
          });
      });

  });
});
