// Dependencies
const restful = require('node-restful');

const mongoose = restful.mongoose;

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  id: Number
});

// Return model
module.exports = restful.model('User', userSchema);
