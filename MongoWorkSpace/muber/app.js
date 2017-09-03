const express = require('express');

const app = express();

// Watch for GET to http://localhost:3030/api
app.get('/api', (req, res) => {
  res.send({ hi: 'there' })
});

module.exports = app;
