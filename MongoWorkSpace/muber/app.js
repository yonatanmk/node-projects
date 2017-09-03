const express = require('express');
const routes = require('./routes/routes')
const app = express();

// Watch for GET to http://localhost:3030/api
routes(app)

module.exports = app;
