'use strict';
const url = require('url');
// url.parse(urlStr, parseQueryString = false): Parses a URL string and returns an object which contains the various parts of the URL.
// url.format(urlObj): Accepts a parsed URL object and returns the string. Does the reverse of url.parse().
// url.resolve(from, to): Resolves a given URL relative to a base URL as a browser would for an anchor tag.
let parsedUrl = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash', true);    
console.log('url.parse a url example ' + JSON.stringify(parsedUrl));

const querystring = require('querystring');
let parseUrl2 = querystring.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
console.log(`querystring.parse a url example : ${JSON.stringify(parseUrl2)}`);// {"http://user:pass@host.com:8080/p/a/t/h?query":"string#hash"}


// Returns the following object:
//  {
//      "protocol":"http:",
//      "slashes":true,
//      "auth":"user:pass",
//      "host":"host.com:8080",
//      "port":"8080",
//      "hostname":"host.com",
//      "hash":"#hash",
//      "search":"?query=string",
//      "query":{"query":"string"},
//      "pathname":"/p/a/t/h",
//      "path":"/p/a/t/h?query=string","href":"http://user:pass@host.com:8080/p/a/t/h?query=string#hash"
// }




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