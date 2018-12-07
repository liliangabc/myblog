const cluster = require('cluster')

function startWorker() {
  let worker = cluster.fork()
  console.log(`CLUSTER: 工人 ${worker.id} 已开始工作.`)
}

if (cluster.isMaster) {
  require('os').cpus().forEach(startWorker)
  cluster.on('disconnect', worker => {
    console.log(`CLUSTER: 工人 ${worker.id} 已停止工作.`)
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log(`CLUSTER: 工人 ${worker.id} 被杀死，退出码 ${code}(${signal})`)
    startWorker()
  })
} else {
  require('./app')()
}