// Dependencies
const express = require('express');

const router = express.Router();

// Models
const User = require('../models/user');
const Hero = require('../models/hero');

// Routes
// User routes
router.post('/user', function (req, res, next) {
  User.create(req.body).then(function (user) {
    res.send(user);
  }).catch(next);
});

router.get('/user/:id', function (req, res, next) {
  User.findOne({id: req.params.id}).then(function (user) {
    res.send(user);
  });
});

// Hero routes

// Return router
module.exports = router;
