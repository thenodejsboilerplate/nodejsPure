'use strict';
let path = require('path');
let log = console.log;
log(`
   path.dirname('/foo/bar/baz/asdf/quux'): ${path.dirname('/foo/bar/baz/asdf/quux')},
   path.extname('li.js'): ${path.extname('li.js')},
   
   path.basename('/foo/bar/baz/asdf/quux.html'): ${path.basename('/foo/bar/baz/asdf/quux.html')},
   process.env.PATH: ${process.env.PATH},//// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
   process.env.PATH.split(path.delimiter): ${process.env.PATH.split(path.delimiter)}///// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']


`);
