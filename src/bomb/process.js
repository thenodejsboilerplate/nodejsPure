'use strict';
const util = require('util');
//If the Node.js process is spawned with an IPC channel (see the Child Process and Cluster documentation), the 'message' event is emitted whenever a message sent by a parent process using childprocess.send() is received by the child process.
// const cp = require('child_process');
// const n = cp.fork(`${__dirname}/process.js`);
// n.send({mes: 'send by the child_process'});
// process.on('message', function(message,undefined){
//   console.log(`message from the child process: ${message.mes}`);
// });

//promise related process checked at ./promiseErrorHandling.js

let fs= require('fs');
process.on('uncaughtException', (err) => {
  //fs.writeSync(1, `Caught exception: ${err}`);
  process.emitWarning('do not use uncaughtException method unless you have to');
  console.log(`Caught exception: ${err}`);
});

let con = true;
if(con===true){
  process.exitCode = 1;
}

setTimeout(() => {
  console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
//nonexistentFunc();
//fs.writeFile('./add.js','ddd', function(err,data){df});
console.log('This will not run.');


//warnings are not part of the normal Node.js and JavaScript error handling flow. Node.js can emit warnings whenever it detects bad coding practices that could lead to sub-optimal application performance, bugs or security vulnerabilities.

const EventEmitter = require('events');
class CustomEvent extends EventEmitter{

}
let myEvent = new CustomEvent();
myEvent.setMaxListeners(1);
myEvent.on('foo', ()=>{});
myEvent.on('foo', ()=>{});

process.on('warning', (warning) => {
  //console.warn('Do not do that!');
 //you can set it yourself like:  warning.message = `Trver: ${warning.message}`;
  console.log(
      `
       warning.name: ${warning.name},
       warning.message: ${warning.message},
       warning.stack: ${warning.stack}
     `
  );
});

// issue custom or application specific warnings.
//process.emitWarning('do not use uncaughtException method unless you have to'); check above 'uncaughtException' listener

// Emit a warning using a string...
//process.emitWarning('Something happened!');
  // Prints: (node 12345) Warning: Something happened!

// Emit a warning using an object...
//process.emitWarning('Something Happened!', 'CustomWarning');
  // Prints: (node 12345) CustomWarning: Something happened!

// Emit a warning using a custom Error object...
class CustomWarning extends Error {
  constructor(message,warningType) {
    super(message);
    this.name = warningType;
    Error.captureStackTrace(this, CustomWarning);
  }
}
const myWarning = new CustomWarning('Something happened!','CustomWarning');
process.emitWarning(myWarning);

//Emitting custom deprecation warnings
process.emitWarning('This api is deprecated', 'DeprecationWarning');

let emitMyWarning = require('./common/warning.js').emitMyWarning;
emitMyWarning('your api deprecated!');
emitMyWarning('your api deprecated............!','DeprecationWarning');//will not emited


console.log(`This processor architecture is ${process.arch}`);

console.log(`process.argv: ${util.inspect(process.argv,{depth:null})}, process.argv[0]: ${process.argv[0]}`);
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`process.argv[0]: ${process.argv[0]}`);
console.log(`process.env.nodess: ${process.env.nodess}`);

console.log(`process.argv[0]===process.argv0: ${process.argv[0]===process.argv[0]}`);

//try  NODE_ENV=production node process.js nodess=1

// process.argv.forEach(function(v,i,a){
//   console.log(`
//     ${i}: ${v},
//   `);
// });


console.log(`starting directory: ${process.cwd()}`);
try{
  process.chdir('./newdir');
  console.log(`new directory: ${process.cwd()}`);
}
catch(err) {
  console.log(`chdir: ${err}`);
}


//The process.cpuUsage() method returns the user and system CPU time usage of the current process, in an object with properties user and system, whose values are microsecond values (millionth of a second). These values measure time spent in user and system code respectively, and may end up being greater than actual elapsed time if multiple CPU cores are performing work for this process.

//The result of a previous call to process.cpuUsage() can be passed as the argument to the function, to get a diff reading.
const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
// { user: 514883, system: 11226 }




//ecec:  node --harmony process.js --version /MYNODE_ENV=pro node app.js behind=behind
console.log(`
        process.env: ${util.inspect(process.env)};
        process.execArgv: ${util.inspect(process.execArgv)};
        process.argv: ${util.inspect(process.argv)};
        process.execPath: ${util.inspect(process.execPath)}
`);


console.log(`
   process.getegid(): ${process.getegid ? process.getegid() : 'no process.getegid method exit(mostly in window)'},
   process.geteuid(): ${process.geteuid ? process.geteuid : 'no process.geteuid method exit(mostly in window)'},
   process.getgid() : ${process.getgid ? process.getgid() : 'no process.getgid method exit(mostly in window)'},
   process.getgroups() : ${process.getgoups ? process.getgroups() : 'no process.getgroups method exit(mostly in window)'}, 
   process.getuid() : ${process.getuid ? process.getuid() : 'no process.getuid method exit(mostly in window)'},
  
   }
`);














//Note: An easy way to send the SIGINT signal is with <Ctrl>-C in most terminal programs.

process.on('SIGINT', () => {
  console.log('Received SIGINT.  Press Control-D to exit.');
});

process.on('SIGKILL', ()=>{
  console.log('Received SIGKILL. I\'ll quit');
});


//process.abort();The process.abort() method causes the Node.js process to exit immediately and generate a core file.


















process.on('disconnect', function(){
  console.log(' the IPC channel is closed (see the Child Process and Cluster documentation)');
});

process.on('exit', function(code){
    // /Listener functions must only perform synchronous operations.
    //The Node.js process will exit immediately after calling the 'exit' event listeners causing any additional work still queued in the event loop to be abandoned. In the following example, for instance, the timeout will never occur:
  console.log(`about to exit with code: ${code}`);
});

process.on('beforeExit', function(exitCode){
    //a listener registered on the 'beforeExit' event can make asynchronous calls, and thereby cause the Node.js process to continue.
  console.log(` Node.js empties its event loop and has no additional work to schedule. exitCode: ${exitCode}`);
});