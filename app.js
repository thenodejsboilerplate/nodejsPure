'use strict';
//const app = require('./app.js'),
const http = require('http');

const app = http.createServer(function(req,res){
  //console.log(`req is ${req}; res is ${res}`);
  //res.send('testing page using pure nodjes');
  debugger;
  res.writeHead(200, {
    'Content-Type':'text/plain'
  });
  res.end('hello world. it\'s the world');
  
});

/**example */
//const streamFile = require('./src/bomb/stream');
// streamFile('./a.txt');
// require('./src/bomb/reqres')(app);
 //require('./src/bomb/url');
// require('./src/bomb/httpclient');
//require('./src/bomb/file');


if(module === require.main) {
  debugger;
  console.log(`${filename} is the main module being run.`);
}

app.listen('8000','localhost');

app.on('close', function(req,res){
  console.log('server closed');
});

module.exports = app;