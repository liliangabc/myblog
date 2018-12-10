const crypto = require('crypto')

let md5 = crypto.createHash('sha384')
let result = md5.update('sssrt').digest('hex')
console.log(result)