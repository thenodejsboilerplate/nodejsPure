'use strict'
const cluster = require('cluster')
const http = require('http')
const fs = require('fs')
// Firstly, the master process runs the whole time, and only workers are terminated and restarted. Therefore, it’s important to keep your master process short and only in charge of managing workers.
function restartWorkers () {
  let wid
  let workerIds = []
  for (wid in cluster.workers) {
    workerIds.push(wid)
  }

  workerIds.forEach(function (wid) {
    cluster.workers[wid].send({
      type: 'shutdown',
      from: 'master'
    })

    setTimeout(function () {
      if (cluster.workers[wid]) {
        cluster.workers[wid].kill('SIGKILL')
      }
    }, 50000)
  })
} // end of restartWorkers

if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length
  console.log('Master cluster setting up ' + numWorkers + ' workers...')

  //  get the ID of all the running workers from the workers object in the cluster module. This object keeps a reference to all the running workers and is dynamically updated when workers are terminated and restarted

  fs.watch('./clusterZeroDown.js', function () {
    restartWorkers()
  })

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  } 

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })

  cluster.on('exist', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
  })

} else {
  process.on('message', function (message) {
    if (message.type === 'shutdown') {
      process.exit(0)
    }
  })

  http.createServer((req, res) => {
   // or express code
    res.writeHead(200)
    res.end('Hi, this is node ' + cluster.worker.id + ' of a cluster')
  }).listen(8080, () => {
    console.log('Listening on port 8080')
  })
}
