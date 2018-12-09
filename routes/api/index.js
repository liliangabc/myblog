const express = require('express')
const svgCaptcha = require('svg-captcha')
const userRoute = require('./user')
const postsRoute = require('./posts')
const emailHelper = require('../../utils/email')
const validator = require('../../utils/validator')
const constants = require('../../utils/constants')
const router = express.Router()

router.get('/captcha', (req, res) => {
  let captcha = svgCaptcha.create()
  req.session.captcha = captcha.text.toLowerCase()
  res.type('svg').send(captcha.data)
})

router.post('/email_captcha', (req, res) => {
  let { email } = req.body
  let emailValidResult = validator.validEmailResult(email)
  if (emailValidResult) return res.send(403, constants.EMAIL_ERROR)
  let captcha = 1000 + Math.floor(Math.random() * 9000)
  emailHelper.sendMail(email, '密码重置', `您的验证码是：<b>${captcha}</b>`).then(info => {
    req.session.emailCaptcha = captcha
    res.json({ info: constants.EMAIL_CAPTCHA_SEND_SUCCESS })
  }).catch(err => {
    res.send(500, constants.SMTP_ERROR)
  })
})

module.exports = app => {
  app.use('/api/user', userRoute)
  app.use('/api/posts', postsRoute)
  app.use('/api', router)
}