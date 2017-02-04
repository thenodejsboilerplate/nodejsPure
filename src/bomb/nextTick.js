//http://becausejavascript.com/node-js-process-nexttick-vs-setimmediate/
// process.nextTick()

// The callback of a process.nextTick() is placed at the head of the event queue and is completely processed before I/O or timer callbacks but still after execution of the current execution context. It is used when we need to postpone emitting an event until after the caller has had the chance to register an event listener for this event.

// setImmediate()

// setImmediate is similiar to setInterval/setTimeOut in that it has a cancelImmediate() in the same way as canceInterval/cancelTimeout, but it lacks a time as a second argument.

// Actually in a sense it is closer to process.nextTick. The difference with nextTick is that setImmediate's callback is queued afer I/O callbacks, while nextTick's callback is queued to execute before I/O callbacks.

// NOTE: the names are counter-intuitive since in reality the setImmediate callback is actually executed after the process.nextTick callback.


//process.nextTick() defer the execution of an action till the next pass around the event loop or simply it calls the callback function once the current execution of the event loop is finished.
//setImmediate executes a callback on the next cycle of the event loop and gives back to the event loop for executing any I/O operations. According to NodeJS.org setTimeout() is there to schedule execution of a one-time callback after delay milliseconds. 

//Use setImmediate if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use process.nextTick to effectively queue the function at the head of the event queue so that it executes immediately after the current function completes.

// So in a case where you're trying to break up a long running, CPU-bound job using recursion, you would now want to use setImmediate rather than process.nextTick to queue the next iteration as otherwise any I/O event callbacks wouldn't get the chance to run between iterations.




// Example

// Executing the following code:
'use strict';
let fs = require('fs');


// fs.readFile('./filefolder/stdout.log','utf-8', function(err, data){
//   if(err){
//     console.log(err.stack);
//   }
//   console.log(`data sis ${data}`);
// });

var readStreamFile = fs.createReadStream('./filefolder/stderr.log');
readStreamFile.on('error', function(err) {
  console.log('Error '+err);
  throw err;
});
setImmediate(function() {
  console.log('IMMEDIATE');
});

// readStreamFile.on('data', function(data) {
//   console.log('Data '+data);
// });
// readStreamFile.on('end', function(){
//   console.log('Finished reading all of the data');
// });


setTimeout(function() {
  console.log('TIMEOUT');
}, 0);


process.nextTick(function() {
  console.log('NEXTTICK');
});


// NEXTTICK
// TIMEOUT
// IMMEDIATE
//data sis count: 5





// function a() {
//   setImmediate(function() {
//     console.log('setImmediate example 2');
//   });
//   process.nextTick(function(){
//     console.log('dkdk');
//   });
//   setImmediate(function() {
//     console.log('setImmediate example 22');
//   });
//   for(var i = 0; i < 5; i++)
//     { 
//     console.log('Inside Function ' + i);
//     process.nextTick(function() 
//      {
//       console.log('Something ' + i);
//     });
//   }
// }
// a();


// Inside Function 0
// Inside Function 1
// Inside Function 2
// Inside Function 3
// Inside Function 4
// dkdk
// Something 5
// Something 5
// Something 5
// Something 5
// Something 5
// setImmediate example 2
// setImmediate example 22


//All callbacks passed to process.nextTick() will be resolved before the event loop continues.
// process.nextStick(function(){
//    console.log('Hello world 3'); // It's like be at the bottom at this file
// });

//Cases for use process.nextTick() when you have to emit and event before to handled it:

// const EventEmitter = require('events');
// const util = require('util');

// function MyEmitter() {
//   EventEmitter.call(this);

//   // use nextTick to emit the event once a handler is assigned
//   process.nextTick(function () {
//     this.emit('event');
//   }.bind(this));
// }
// util.inherits(MyEmitter, EventEmitter);

// const myEmitter = new MyEmitter();
// myEmitter.on('event', function() {
//   console.log('an event occurred!');
// });