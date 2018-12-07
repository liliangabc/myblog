const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userId: String
})

module.exports = mongoose.model('users', userSchema)