// Dependencies
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  lvl: {
    type: Number,
    default: 1
  },
  health: {
    type: Number,
    default: 5
  },
  strength: {
    type: Number,
    default: 1
  },
  defence: {
    type: Number,
    default: 1
  },
  dodge: {
    type: Number,
    default: 1
  }
});

// Schema
const UserSchema = new Schema({
  userName: {
    type: String
  },
  firstName: {
    type: String
  },
  nick: {
    type: String,
    default: ''
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  stats: {
    type: StatSchema,
    default: {}
  }
});

UserSchema.plugin(uniqueValidator);

// Return model
module.exports = mongoose.model('user', UserSchema);
