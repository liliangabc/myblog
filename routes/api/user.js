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
  let validResult = validator.validUserNameResult(userName) ||
    validator.validEmailResult(email) ||
    validator.validPwdResult(password) ||
    validator.validCaptchaResult(captcha, req)
  // 删除会话中的验证码
  delete req.session.captcha
  if (validResult) return res.send(403, validResult)
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
      sendActivateMail(req, res, email, (err, code) => {
        if (err) return res.send(500, constants.SERVER_ERROR)
        // 保存用户信息到数据库
        password = crypto.createHash('md5').update(password).digest('hex')
        new User({ userName, password, email, activateInfo: { code } }).save(err => {
          if (err) {
            res.send(500, constants.DB_ERROR)
          } else {
            res.json({ info: constants.REGISTER_SUCCESS })
          }
        })
      })
    }
  })
})

/**
 * 激活
 */
router.get('/activate', (req, res) => {
  // 获取并验证数据
  let flash, { code } = req.query
  let invalid = { type: 'warning', msg: constants.ACTIVATE_CODE_INVALID }
  if (typeof code !== 'string') {
    req.session.flash = invalid
    res.redirect(303, '/page/activate_state')
  } else {
    // 查找并更新用户信息
    User.findOneAndUpdate(
      { 'activateInfo.code': code }, 
      { $set: { isActivated: true }, $unset: { activateInfo: 0 } },
      (err, user) => {
        if (err) {
          flash = { type: 'danger', msg: constants.DB_ERROR }
        } else if (user) {
          // 检查激活码是否过期
          let nowDate = new Date()
          let startDate = user.activateInfo.date || user.createdDate
          if (nowDate - startDate > 24 * 60 * 60 * 1000) {
            flash = invalid
          } else {
            flash = { type: 'success', msg: constants.ACTIVATE_SUCCESS }
          }
        } else {
          flash = invalid
        }
        req.session.flash = flash
        res.redirect(303, '/page/activate_state')
      }
    )
  }
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  // 获取数据并验证
  let { email, password, captcha } = req.body
  let validResult = validator.validEmailResult(email) || validator.validPwdResult(password)
  let captchaValidResult = validator.validCaptchaResult(captcha, req)
  delete req.session.captcha
  if (validResult) {
    res.send(403, constants.EMAIL_OR_PWD_ERROR)
  } else if (captchaValidResult) {
    res.send(403, constants.CAPTCHA_ERROR)
  } else {
    // 查找用户是否存在
    password = crypto.createHash('md5').update(password).digest('hex')
    User.findOne({ email: email.trim() }, (err, user) => {
      if (err) {
        res.send(500, constants.DB_ERROR)
      // 用户存在且密码正确，那么检查用户是否已激活
      } else if (user && user.password === password) {
        req.session.userId = user._id
        // 如果已经激活，那么登录成功
        if (user.isActivated) {
          res.json({ info: constants.LOGIN_SUCCESS })
        } else {
          res.json({ code: 401, info: constants.NO_ACTIVATE })
        }
      } else {
        res.send(403, constants.EMAIL_OR_PWD_ERROR)
      }
    })
  }
})

/**
 * 发送激活邮件
 */
router.post('/send_activate_mail', (req, res) => {
  let { email } = req.body
  let emailValidResult = validator.validEmailResult(email)
  if (emailValidResult) {
    return res.send(403, emailValidResult)
  }
  let { userId } = req.session
  if (!userId) {
    return res.send(401, constants.NO_USER_SESSION)
  }
  sendActivateMail(req, res, email, (err, code) => {
    if (err) {
      res.send(500, constants.SERVER_ERROR)
    } else {
      User.findByIdAndUpdate(userId, {
        $set: { 'activateInfo.code': code, 'activateInfo.date': new Date() }
      }, err => {
        if (err) {
          res.send(500, constants.DB_ERROR)
        } else {
          res.json({ info: constants.ACTIVATE_EMAIL_SUCCESS })
        }
      })
    }
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
  if (!captcha || captcha !== req.session.emailCaptcha) {
    return res.send(403, constants.CAPTCHA_ERROR)
  }
  User.updateOne({ email: email.trim() }, { $set: { password } }, (err, raw) => {
    if (err) {
      res.send(500, constants.DB_ERROR)
    } else if (raw) {
      res.json({ info: constants.PWD_RESET_SUCCESS })
    } else {
      res.send(403, constants.USER_NOT_FIND)
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
    if (err) {
      res.send(500, constants.DB_ERROR)
    } else if (user) {
      let captcha = (1000 + Math.floor(Math.random() * 9000)).toString()
      emailHelper.sendMail(email, constants.USER_PWD_RESET_SUBJECT, `您的验证码是：<b>${captcha}</b>`).then(() => {
        req.session.emailCaptcha = captcha
        res.json({ info: constants.EMAIL_CAPTCHA_SEND_SUCCESS })
      }).catch(() => {
        res.send(500, constants.SMTP_ERROR)
      })
    } else {
      res.send(403, constants.USER_NOT_FIND)
    }
  })
})

/**
 * 退出
 */
router.post('/logout', (req, res) => {
  delete req.session.userId
  res.json({ info: constants.USER_EXIT_SUCCESS })
})

/**
 * 获取用户信息
 */
router.get('/info', (req, res) => {
  let { userId } = req.session
  if (!userId) {
    return res.json({ info: constants.NO_USER_SESSION, data: {} })
  }
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(500, constants.DB_ERROR)
    } else if (user) {
      let { __v, password: _pwd, ...data } = JSON.parse(JSON.stringify(user))
      res.json({ info: constants.GET_SUCCESS, data })
    } else {
      res.json({ info: constants.USER_NOT_FIND, data: {} })
    }
  })
})

/**
 * 发送激活邮件
 * @param {Request} req 
 * @param {Response} res 
 * @param {String} email 
 * @param {Function} cb 
 */
function sendActivateMail(req, res, email, cb = () => {}) {
  let site = `${req.protocol}://${req.headers.host}`
  let code = crypto.createHash('sha256').update(Math.random().toString()).digest('hex')
  let url = `${site}/api/user/activate?code=${code}`
  res.render('email_activate', { email, url, site }, (err, html) => {
    if (err) return cb(err)
    emailHelper.sendMail(email, constants.USER_ACTIVATE_SUBJECT, html).then(() => cb(null, code)).catch(cb)
  })
}

module.exports = router