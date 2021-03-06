const mongoose = require('mongoose')
const config = require('../utils/config')

exports.createDBConn = app => {
  let options = {
    useNewUrlParser: true ,
    server: { socketOptions: { keepAlive: 1 }}
  }
  mongoose.connect(config.mongo.url, options)
  mongoose.connection.on('open', err => {
    if (err) console.error(err)
    console.log('数据库连接成功！')
  })
}