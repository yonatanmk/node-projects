const Driver = require('../models/Driver');

module.exports = {
  greeting: (req, res) => { // method 1 for storing func in controller
    res.send({ hi: 'there' })
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) { // method 2 for storing func in controller
    const DriverProps = req.body;
    Driver.create(DriverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit: function(req, res, next) { // method 3 for storing func in controller
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: id }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
}
