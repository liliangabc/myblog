const mongoose = require('mongoose')

const baseObj = {
  content: String,
  userName: String,
  userId: String,
  createdDate: { type: Date, default: Date.now }
}

const commentSchema = new mongoose.Schema({
  ...baseObj
})

const postsSchema = new mongoose.Schema({
  ...baseObj,
  title: String,
  comments: [commentSchema]
})

module.exports = mongoose.model('posts', postsSchema)