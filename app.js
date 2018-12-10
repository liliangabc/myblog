const http = require('http')
const swig = require('swig')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const config = require('./utils/config')
require('./models/conn-db').connDB()

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({
  resave: true,
  saveUninitialized: false,
  secret: config.sessionSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.engine('swig', swig.renderFile)
app.set('view engine', 'swig')

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