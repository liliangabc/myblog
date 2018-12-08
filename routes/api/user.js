const express = require('express')
const router = express.Router()

/**
 * 注册
 */
router.post('/register', (req, res) => {
  res.send('用户注册')
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  res.send('用户登录')
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