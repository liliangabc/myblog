const express = require('express')
const svgCaptcha = require('svg-captcha')
const userRoute = require('./user')
const postsRoute = require('./posts')
const router = express.Router()

router.get('/captcha', (req, res) => {
  let captcha = svgCaptcha.create()
  req.session.captcha = captcha.text.toLowerCase()
  res.type('svg').send(captcha.data)
})

module.exports = app => {
  app.use('/api/user', userRoute)
  app.use('/api/posts', postsRoute)
  app.use('/api', router)
}