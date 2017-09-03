const Driver = require('../models/Driver');

module.exports = {
  greeting: (req, res) => { // method 1 for storing func in controller
    res.send({ hi: 'there' })
  },
  create(req, res, next) { // method 2 for storing func in controller
    const DriverProps = req.body;
    Driver.create(DriverProps)
      .then(driver => res.send(driver))
      .catch(next);
  }

  // next: function (req, res) { // method 3 for storing func in controller
  //
  // }
}
