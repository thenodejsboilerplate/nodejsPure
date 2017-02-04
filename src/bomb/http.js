'use strict';
let http = require('http');
let util = require('util');
let logger = console.log;
//http.createServer is the instance of http.Server
const app = new http.Server(function(req,res){
    console.log(`req url: ${req.url}`);// /
    logger(require('url').parse(req.url));
    console.log(`req.method ${req.method}, req.httpVersion: ${req.httpVersion}, `);//get
//   //Boolean (read-only). True if headers were sent, false otherwise.
//   if(!res.headersSent){

//   }



//   console.log(`connected to the server, 
//         req: ${util.inspect(req)},
//         res: ${util.inspect(res)}`
//   );
  //console.log(req.rawHeaders);
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, 'sent successfully',{
    'Content-Type':'text/plain'
  });
  //Status Code:200 sent successfully


  //If data is specified, it is equivalent to calling response.write(data, encoding) followed by response.end(callback).
 // res.end('hello world. it\'s the world'); //which is equal to:
  res.write('hello world. it\'s the world','utf-8');
  res.end(function(req, res){
      console.log(`the res end`);
      
  });

  if(res.finished){
      console.log(`the response has completed`);
  }


});
// const app = http.createServer(function(req,res){

// //   console.log(`connected to the server, 
// //         req: ${util.inspect(req)},
// //         res: ${util.inspect(res)}`
// //   );
//   console.log(req.rawHeaders);
//   res.writeHead(200, {
//     'Content-Type':'text/plain'
//   });
//   res.end('hello world. it\'s the world');
  

// });
if(app.listening){
  console.log(' the server is listening for connections.');
}
app.listen('8000','localhost', function(req,res){
  console.log(`connected to http://localhost:${app.address().port}`);
})
.on('request', function(req, res){
  console.log('there is a request'+ new Date().getTime());
})
.on('close', function(req,res){
  console.log('server closed');
});

