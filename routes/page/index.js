const express = require('express')
const router = express.Router()

router.get('/activate_state', (req, res) => {
  res.render('activate_state', { title: '用户激活状态' })
})

module.exports = router