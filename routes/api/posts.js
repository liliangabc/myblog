const express = require('express')
const router = express.Router()

/**
 * 创建
 */
router.post('/', (req, res) => {
  res.send('创建')
})

/**
 * 列表
 */
router.get('/list', (req, res) => {
  res.send('帖子列表')
})

/**
 * 删除 | 更新 | 查看
 */
router.route('/:id').delete((req, res) => {
  res.send('帖子删除')
}).put((req, res) => {
  res.send('帖子更新')
}).get((req, res) => {
  res.send('帖子查看')
})

module.exports = router