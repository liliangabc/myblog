module.exports = app => {
  require('./api')(app)
  app.use('/page', require('./page'))
}