// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/bot_test');
mongoose.Promise = global.Promise;

// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./server/routes/api'));

// Error handling
app.use(function (err, req, res, next) {
  res.status(422).send({
    error: err.message
  });
});

// Start server
app.listen(3000, function () {
  console.log('API is running on port 3000');
});
