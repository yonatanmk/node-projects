const Driver = require('../../models/Driver');

module.exports = {
  greeting: (req, res) => { // method 1 for storing func in controller
    res.send({ hi: 'there' })
  },
  create(req, res) { // method 2 for storing func in controller
    console.log(req.body)
    res.send({ hi: 'there' })
  }

  // next: function (req, res) { // method 3 for storing func in controller
  //
  // }
}
