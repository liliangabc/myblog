const userRoute = require('./user')
const postsRoute = require('./posts')

module.exports = app => {
  app.use('/api/user', userRoute)
  app.use('/api/posts', postsRoute)
}