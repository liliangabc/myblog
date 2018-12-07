const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdDate: Date
})

module.exports = mongoose.model('posts', postsSchema)