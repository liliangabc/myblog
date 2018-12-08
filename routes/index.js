module.exports = app => {
  app.get(/^\/(index)?$/, (req, res) => res.send('首页'))
  require('./api')(app)
}