/**
 * 常量定义模块
 */

module.exports = {
  EMAIL_REG: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  USER_NAME_ERROR: '请输入2-22位用户名',
  USER_PWD_ERROR: '请输入6-18位密码',
  EMAIL_ERROR: '请输入正确的邮箱地址',
  CAPTCHA_ERROR: '验证码错误',
  DB_ERROR: '数据库错误',
  USER_USED: '该用户名已被注册',
  USER_NOT_FIND: '该用户不存在',
  EMAIL_USED: '该邮箱已被注册',
  EMAIL_OR_PWD_ERROR: '邮箱或密码错误',
  REGISTER_SUCCESS: '恭喜你！注册成功',
  LOGIN_SUCCESS: '登录成功',
  PWD_RESET_SUCCESS: '密码重置成功',
  EMAIL_CAPTCHA_SEND_SUCCESS: '验证码已发送到您的邮箱，24小时内有效，请查收邮件',
  SMTP_ERROR: '邮件服务器连接错误'
}