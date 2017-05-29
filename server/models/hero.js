// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const HeroSchema = new Schema({
  userId: {
    type: String
  },
  heroName: {
    type: String
  }
});

// Return model
module.exports = mongoose.model('hero', HeroSchema);
