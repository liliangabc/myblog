let { DB_URL, SESSION_SECRET } = process.env
module.exports = {
  DB_URL: (DB_URL || 'mongodb://127.0.0.1:27017') + '/appdata',
  sessionSecret: SESSION_SECRET || 'test2018'
}