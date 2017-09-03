const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise; // fixes a mongoose deprecation error

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber'); // connects to local mongo database. connection to test db mage in test_helper
}

app.use(bodyParser.json());
routes(app);

module.exports = app;
