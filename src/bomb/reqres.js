'use strict';
const url = require('url');
const http = require('http');

module.exports = function(app){
  app.on('request', function(req,res){
    console.log(`there is a request. 
       req: ${req};
       res: ${res};
       cookies: ${req.headers.cookies};
       req.url: ${req.url}; 
       req.method: ${req.method};
       req.headers: ${JSON.stringify(req.headers,['accept-encoding','connection'],' ')}`);


// The QueryString module provides two functions:

// querystring.parse(str, sep=’&amp;’, eq=’=’): Parses a GET query string and returns an object that contains the parameters as properties with values. Example: qs.parse(‘a=b&c=d’) would return {a: ‘b’, c: ‘d’}.
// querystring.stringify(obj, sep=’&amp;’, eq=’=’): Does the reverse of querystring.parse(); takes an object with properties and values and returns a string. Example: qs.stringify({a: ‘b’}) would return ‘a=b’.
// You can use querystring.parse to convert POST data into an object:

        // var querystring = require('querystring');
        // var data = '';
        // req.on('data', function(chunk) {
        // data += chunk;
        // });
        // req.on('end', function() {
        // var post = querystring.parse(data);
        // console.log(post);
        // });



// The second parameter of the request handler callback is a ServerResponse object. ServerResponses are Writable Streams, so we write() data and call end() to finish the response.
    let url_parts = url.parse(req.url, true);
    switch(url_parts.pathname){
      case '/':
        res.write('<html><body>Home page!</body></html>');
        break;
      case '/home':
      //redirecting to a different url
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
        break;
      default:
        res.write('Unknow path: ' + JSON.stringify(url_parts));
      
    }
    res.end();
    // response.end() must be called on each response to finish the response and close the connection.

  });
};

// Parsing POST requests
