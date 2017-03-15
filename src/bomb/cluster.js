'use strict'
const cluster = require('cluster')
const http = require('http')
// Firstly, the master process runs the whole time, and only workers are terminated and restarted. Therefore, it’s important to keep your master process short and only in charge of managing workers.
if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length
  console.log('Master cluster setting up ' + numWorkers + ' workers...')

  let wk = {'hi': 'this is from master'}  // wk = 'this is ..' is okay(which is not a reference but object is a reference)
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork({worker: wk})
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })

  cluster.on('exist', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork({worker: wk})
  })
} else {

  http.createServer((req, res) => {
   // or express code
    res.writeHead(200)
    res.end('Hi, this is node ' + cluster.worker.id + ' of a cluster' + ' mes' + process.env.worker.hi)
  }).listen(8080, () => {
    console.log('Listening on port 8080')
  })
}




/******* zero down-time servers using workers && scaling up the applications by spliting a single process into multiple processes or workers********/
//####inspired by link:https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
//####and web development with node and express by Ethan Brown #p117

//KNOWLEDAGE POINTS:
//by using a Node.js cluster,it will start up multiple instances of your code to handle even more requests. 
//The functionality of the code is split up in to two parts, the master code and the worker code. This is done in the if-statement (if (cluster.isMaster) {...}). The master's only purpose here is to create all of the workers (the number of workers created is based on the number of CPUs available), and the workers are responsible for running separate instances of the Express server.
//But how are requests divided up between the workers? Obviously they can't (and shouldn't) all be listening and responding to every single request that we get. To handle this, there is actually an embedded load-balancer within the cluster module that handles distributing requests between the different workers. On Linux and OSX (but not Windows) the round-robin (cluster.SCHED_RR) policy is in effect by default. The only other scheduling option available is to leave it up to the operating system (cluster.SCHED_NONE), which is default on Windows.

// The scheduling policy can be set either in cluster.schedulingPolicy or by setting it on the environment variable NODE_CLUSTER_SCHED_POLICY (with values of either 'rr' or 'none').

// When a worker is forked off of the main process, it re-runs the code from the beginning of the module. When the worker gets to the if-statement, it returns false for cluster.isMaster, so instead it'll create the Express app, a route, and then listens on port 8080. In the case of a quad-core processor, we'd have four workers spawned, all listening on the same port for requests to come in.

//Each Node.js process runs in a single thread and by default it has a memory limit of 512MB on 32-bit systems and 1GB on 64-bit systems. Although the memory limit can be bumped to ~1GB on 32-bit systems and ~1.7GB on 64-bit systems, both memory and processing power can still become bottlenecks for various processes.

//A cluster is a pool of similar workers running under a parent Node process. Workers are spawned using the fork() method of the child_processes module. This means workers can share server handles and use IPC (Inter-process communication) to communicate with the parent Node process.

// the master process is in charge of initiating workers and controlling them. You can create an arbitrary number of workers in your master process. Moreover, remember that by default incoming connections are distributed in a round-robin approach among workers (except in Windows). Actually there is another approach to distribute incoming connections, that I won’t discuss here, which hands the assignment over to the OS (default in Windows). Node.js documentation suggests using the default round-robin style as the scheduling policy.

// The elegant solution Node.js provides for scaling up the applications is to split a single process into multiple processes or workers, in Node.js terminology. This can be achieved through a cluster module. The cluster module allows you to create child processes (workers), which share all the server ports with the main Node process (master).

