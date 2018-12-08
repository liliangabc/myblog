const express = require('express')
const crypto = require('crypto')
const User = require('../../models/user')
const router = express.Router()

/**
 * 注册
 */
router.post('/register', (req, res) => {
  let { userName, password, email } = req.body
  const md5 = crypto.createHash('md5')
  password = md5.update(password).digest('hex')
  new User({ userName, password, email }).save((err, user) => {
    if (err) return res.send(500, '数据库错误')
    res.json({ info: '恭喜你！注册成功' })
  })
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  let { email, password } = req.body
  const md5 = crypto.createHash('md5')
  password = md5.update(password).digest('hex')
  User.findOne({ email }, (err, user) => {
    if (err) res.send(500, '数据库错误')
    if (!user) {
      res.send(403, '该用户不存在！')
    } else {
      if (user.password !== password) {
        res.send(403, '密码错误！')
      } else {
        res.json({ info: '登录成功！' })
      }
    }
  })
})

/**
 * 退出
 */
router.post('/logout', (req, res) => {
  res.send('用户退出')
})

/**
 * 重置密码
 */
router.post('/reset_pwd', (req, res) => {
  res.send('重置密码')
})

module.exports = router