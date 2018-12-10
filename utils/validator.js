/**
 * 数据验证模块
 */
const { EMAIL_REG, EMAIL_ERROR, USER_NAME_ERROR, USER_PWD_ERROR } = require('./constants')

/**
 * 验证用户名
 * 必须2到15位字符串
 * @param {String} userName 
 */
exports.validUserNameResult = userName => {
  let strlen = typeof userName === 'string' ? userName.trim().length : 0
  return (strlen < 2 || strlen > 15) && USER_NAME_ERROR
}

/**
 * 验证密码
 * 必须6到18位字符串
 * @param {String} password 
 */
exports.validPwdResult = password => {
  let strlen = typeof password === 'string' ? password.length : 0
  return (strlen < 6 || strlen > 18) && USER_PWD_ERROR
}

/**
 * 验证邮箱
 * @param {String} email 
 */
exports.validEmailResult = email => {
  return (typeof email !== 'string' || !EMAIL_REG.test(email.trim())) && EMAIL_ERROR
}