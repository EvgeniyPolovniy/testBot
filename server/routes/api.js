// Dependencies
const express = require('express');

const router = express.Router();

// Models
const User = require('../models/user');
const Hero = require('../models/hero');

// Routes
User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/user');

Hero.methods(['get', 'put', 'post', 'delete']);
Hero.register(router, '/hero');

// Return router
module.exports = router;
