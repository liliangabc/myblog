const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const config = require('./utils/config')

const app = express()

require('./models/dbconn').createDBConn(app)
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))
app.use(expressSession({
  resave: true,
  saveUninitialized: false,
  secret: config.cookieSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
require('./routes')(app)

function startServer() {
  http.createServer(app).listen(app.get('port'), () => {
    console.log(`server started in ${app.get('env')} on ${app.get('port')}`)
  })
}

if (require.main === module) {
  startServer()
} else {
  module.exports = startServer
}