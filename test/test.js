var app = require('../app.js');
var request = require('supertest');

describe('GET booyah', () => {
  it('should respond with booyah', (done) => {
    request(app)
      .get('/booyah')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text/)
      .expect(200)
      .expect('booyah', done);
  });
});
