const SESSION_DB = 'session'
const APP_DB = 'appdata'
let DBURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
module.exports = {
  mongo: {
    url: `${DBURL}/${APP_DB}`,
    sessionURL: `${DBURL}/${SESSION_DB}`
  },
  cookieSecret: process.env.COOKIE_SECRET || 'test2018'
}