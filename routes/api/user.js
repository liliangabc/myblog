/**
 * 用户路由器模块
 */

const express = require('express')
const crypto = require('crypto')
const User = require('../../models/user')
const validator = require('../../utils/validator')
const constants = require('../../utils/constants')
const emailHelper = require('../../utils/email')

const router = express.Router()

/**
 * 注册
 */
router.post('/register', (req, res) => {
  // 获取并验证数据
  let { userName, email, password, captcha } = req.body
  let { validUserNameResult, validEmailResult, validPwdResult } = validator
  let validCaptchaResult = () => {
    return (typeof captcha !== 'string' || captcha.toLowerCase() !== req.session.captcha) && constants.CAPTCHA_ERROR
  }
  let validResult = validUserNameResult(userName) || validEmailResult(email) || validPwdResult(password) || validCaptchaResult()
  // 删除会话中的验证码
  delete req.session.captcha
  if (validResult) {
    return res.send(403, validResult)
  }
  // 检查用户是否已存在
  email = email.trim()
  userName = userName.trim()
  User.findOne().or([{ userName }, { email }]).exec((err, user) => {
    if (err) {
      res.send(500, constants.DB_ERROR)
    } else if (user) {
      if (user.userName === userName) {
        res.send(403, constants.USER_USED)
      } else {
        res.send(403, constants.EMAIL_USED)
      }
    // 如果用户名和邮箱没有被使用
    } else {
      let site = `${req.protocol}://${req.headers.host}`
      let code = crypto.createHash('sha384').update(email).digest('hex')
      let url = `${site}/api/user/activate?code=${code}`
      // 渲染邮件激活模板
      res.render('email_activate', { email, url, site }, (err, html) => {
        if (err) {
          res.send(500, constants.SERVER_ERROR)
        } else {
          // 发送邮件
          emailHelper.sendMail(email, '用户账号激活', html).then(() => {
            // 保存用户信息到数据库
            password = crypto.createHash('md5').update(password).digest('hex')
            new User({ userName, password, email, activateCode: code }).save(err => {
              if (err) {
                res.send(500, constants.DB_ERROR)
              } else {
                res.json({ info: constants.REGISTER_SUCCESS })
              }
            })
          })
        }
      })
    }
  })
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  // 获取数据并验证
  let { email, password } = req.body
  let { validEmailResult, validPwdResult } = validator
  let validResult = validEmailResult(email) || validPwdResult(password)
  if (validResult) {
    res.send(403, constants.EMAIL_OR_PWD_ERROR)
  } else {
    // 查找用户是否存在
    password = crypto.createHash('md5').update(password).digest('hex')
    User.findOne({ email: email.trim() }, (err, user) => {
      if (err) {
        res.send(500, constants.DB_ERROR)
      // 用户存在且密码正确，那么检查用户是否已激活
      } else if (user && user.password === password) {
        // 如果已经激活，那么登录成功
        if (user.isActivate) {
          req.session.userId = user._id
          let { __v, password: _pwd, ...data } = JSON.parse(JSON.stringify(user))
          res.json({
            data,
            info: constants.LOGIN_SUCCESS
          })
        } else {
          res.json({
            code: 401,
            info: constants.NO_ACTIVATE
          })
        }
      } else {
        res.send(403, constants.EMAIL_OR_PWD_ERROR)
      }
    })
  }
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
 * 发送邮箱验证码
 */
router.post('/email_captcha', (req, res) => {
  let { email } = req.body
  // 验证数据
  let emailValidResult = validator.validEmailResult(email)
  if (emailValidResult) return res.send(403, constants.EMAIL_ERROR)
  email = email.trim()
  // 查找用户
  User.findOne({ email }, (err, user) => {
    if (err) return res.send(500, constants.DB_ERROR)
    if (!user) return res.send(403, constants.USER_NOT_FIND)
    let captcha = 1000 + Math.floor(Math.random() * 9000)
    emailHelper.sendMail(email, '密码重置', `您的验证码是：<b>${captcha}</b>`).then(() => {
      req.session.emailCaptcha = captcha
      res.json({ info: constants.EMAIL_CAPTCHA_SEND_SUCCESS })
    }).catch(() => {
      res.send(500, constants.SMTP_ERROR)
    })
  })
})

/**
 * 用户激活
 */
router.get('/activate', (req, res) => {
  let { code = '' } = req.query
  User.findOneAndUpdate({ activateCode: code }, { $set: { isActivate: true } }, (err, doc) => {
    if (err) return res.send(500, constants.DB_ERROR)
    // 设置本地消息
    // ...
    if (!doc) return res.send(403, constants.ACTIVATE_CODE_INVALID)
    res.redirect(303, '/page/activate_success')
  })
})

/**
 * 退出
 */
router.post('/logout', (req, res) => {
  res.send('用户退出')
})

module.exports = router