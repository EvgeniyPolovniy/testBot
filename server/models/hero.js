// Dependencies
const restful = require('node-restful');

const mongoose = restful.mongoose;

// Schema
const heroSchema = new mongoose.Schema({
  userId: Number,
  heroName: String
});

// Return model
module.exports = restful.model('Hero', heroSchema);
