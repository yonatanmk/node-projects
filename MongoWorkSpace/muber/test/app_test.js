const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Driver = require('../models/Driver');

describe('the express App', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });

  it('Put to /api/drivers/id can update a record', done => {
    const driver = new Driver({ email: 'test@test.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });
    });
  });

  it('Delete to /api/drivers/:id can delete a record', done => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          // Driver.count().then(count => {
          //   assert(count === 0);
          //   done();
          Driver.findOne({ email: 'test@test.com' })
            .then(driver => {
              assert(driver === null);
              done();
            });
        });
    });
  });

  it('Get to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'miami@test.com');
            done();
          });
      });
  })

});
