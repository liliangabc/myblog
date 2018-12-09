const express = require('express')
const crypto = require('crypto')
const User = require('../../models/user')
const validator = require('../../utils/validator')
const constants = require('../../utils/constants')
const router = express.Router()

/**
 * 注册
 */
router.post('/register', (req, res) => {
  let { userName, email, password, captcha } = req.body
  // 验证数据
  let userNameValidResult = validator.validUserNameResult(userName)
  let emailValidResult = validator.validEmailResult(email)
  let pwdValidResult = validator.validPwdResult(password)
  let captchaValidResult = (() => {
    return (typeof captcha !== 'string' || captcha.toLowerCase() !== req.session.captcha) && constants.CAPTCHA_ERROR
  })();
  let validResult = userNameValidResult || emailValidResult || pwdValidResult || captchaValidResult
  delete req.session.captcha
  if (validResult) return res.send(403, validResult)
  // 检查用户是否已存在
  email = email.trim()
  userName = userName.trim()
  User.findOne().or([{ userName }, { email }]).exec((err, user) => {
    if (err) return res.send(500, constants.DB_ERROR)
    if (user) {
      if (user.userName === userName) {
        return res.send(403, constants.USER_USED)
      } else {
        return res.send(403, constants.EMAIL_USED)
      }
    }
    // 保存用户
    let md5 = crypto.createHash('md5')
    password = md5.update(password).digest('hex')
    new User({ userName, password, email }).save(err => {
      if (err) return res.send(500, constants.DB_ERROR)
      res.json({ info: constants.REGISTER_SUCCESS })
    })
  })
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  let { email, password } = req.body
  let validResult = validator.validEmailResult(email) || validator.validPwdResult(password)
  if (validResult) return res.send(403, constants.EMAIL_OR_PWD_ERROR)
  let md5 = crypto.createHash('md5')
  password = md5.update(password).digest('hex')
  User.findOne({ email }, (err, user) => {
    if (err) return res.send(500, constants.DB_ERROR)
    if (!user || user.password !== password) {
      return res.send(403, constants.EMAIL_OR_PWD_ERROR)
    }
    req.session.userId = user._id
    res.json({
      info: constants.LOGIN_SUCCESS,
      data: {
        id: user._id,
        email: user.email,
        userName: user.userName
      }
    })
  })
})

/**
 * 重置密码
 */
router.post('/reset_pwd', (req, res) => {
  let { email, captcha, password } = req.body
  let emailValidResult = validator.validEmailResult(email)
  let pwdValidResult = validator.validPwdResult(password)
  let validResult = emailValidResult || pwdValidResult
  if (validResult) return res.send(403, validResult)
  if (+captcha !== req.session.emailCaptcha) {
    return res.send(403, constants.CAPTCHA_ERROR)
  }
  User.updateOne({ email: email.trim() }, { $set: { password } }, (err, raw) => {
    if (err) return res.send(500, constants.DB_ERROR)
    if (raw) {
      return res.json({ info: constants.PWD_RESET_SUCCESS })
    } else {
      return res.send(403, constants.USER_NOT_FIND)
    }
  })
})

/**
 * 退出
 */
router.post('/logout', (req, res) => {
  res.send('用户退出')
})

module.exports = router