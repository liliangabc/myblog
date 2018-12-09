const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
  host: 'smtp.live.com',
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
})

let myFrom = `"liliang" <${config.email.user}>`

exports.sendMail = (to, subject, body) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: myFrom,
      to,
      subject,
      html: body
    }, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}