// There is also a HTTP client API, which allows you to make HTTP requests and read content from other websites.


//http.get() returns a http.ClientRequest object, which is a Writable Stream.
//The callback passed to http.get() will receive a http.ClientResponse object when the request is made. The ClientResponse is a Readable Stream.


//To send a simple GET request, you can use http.get. You need to set the following options:

// host: the domain or IP address of the server
// port: the port (e.g. 80 for HTTP)
// path: the request path, including the query string (e.g. 'index.html?page=12')

var http = require('http');

var querystring = require('querystring');
let obj = {q: 'books'};

var options = {
  host: 'www.baidu.com',
  port: 80,
    //To add GET query parameters from an object, use the querystring module:
  path: '/'+'?'+querystring.stringify(obj)
};
var req = http.get(options, function(response) {
    // handle the response
  var res_data = '';
  response.on('data', function(chunk) {
    res_data += chunk;
  });
  response.on('end', function() {
    console.log(res_data);
  });
});
req.on('error', function(e) {
  console.log('Got error: ' + e.message);
});



// To issue POST, DELETE or other requests, you need to use http.request and set the method in the options explicitly:

// var opts = {
//     host: 'www.google.com',
//     port: 80,
//     method: 'POST'
//     path: '/',
//     headers: {}
//   };
// To send the data along with the POST request, call req.write() with the data you want to send along with the request before calling req.end(). To ensure that the receiving server can decode the POST data, you should also set the content-type.

// There are two common encodings used to encode POST request data: application/x-www-form-urlencoded

// // POST encoding
// opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// req.data = qs.stringify(req.data);
// opts.headers['Content-Length'] = req.data.length;
// and application/json:

// // JSON encoding
// opts.headers['Content-Type'] = 'application/json';
// req.data = JSON.stringify(req.data);
// opts.headers['Content-Length'] = req.data.length;
// Making a request is very similar to making a GET request:

// var req = http.request(opts, function(response) {
//   response.on('data', function(chunk) {
//     res_data += chunk;
//   });
//   response.on('end', function() {
//     callback(res_data);
//   });
// });
// req.on('error', function(e) {
//   console.log("Got error: " + e.message);
// });
// // write the data
// if (opts.method != 'GET') {
//   req.write(req.data);
// }
// req.end();





