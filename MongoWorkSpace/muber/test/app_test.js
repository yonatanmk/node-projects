const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express App', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});
