const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise; // fixes a mongoose deprecation error
mongoose.connect('mongodb://localhost/muber'); // connects to local mongo database

app.use(bodyParser.json());
routes(app);

module.exports = app;
