const crypto = require('crypto')

let md5 = crypto.createHash('sha256')
let str = Math.random().toString()
let result = md5.update(str).digest('hex')
console.log(str, result)