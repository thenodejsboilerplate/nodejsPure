'use strict';
let path = require('path');
let util = require('util');
let log = console.log;
log(`
   path.dirname('/foo/bar/baz/asdf/quux'): ${path.dirname('/foo/bar/baz/asdf/quux')},
   path.extname('li.js'): ${path.extname('li.js')},
   // If dir and base are provided, dir+path.sep+base will be returned. others: name, ext,root
   path.format({dir: '/home/user/dir', base: 'file.txt}): ${path.format({dir: '/home/user/dir', base: 'file.txt'})},
   path.isAbsolute('./module/head.js'): ${path.isAbsolute('./module/head.js')},
   path.join('/foo/li', '..', 'goo', './hoo', 'ioo', '../joo'): ${path.join('/foo/li', '..', 'goo', './hoo', 'ioo', '../joo')},
   //path.resolve && path.resolve
   path.resolve('/a','/b'): ${path.resolve('/a','/b')},path.join('/a','/b'): ${path.join('/a','/b')},
   path.relative('/data/test/aaa', '/data/bb'): ${path.relative('/data/test/aaa', '/data/bb')},
   path.sep: ${JSON.stringify(path.sep)}


   path.normalize('/foo////bar/////baz/za\baz\bazzz\..'):${path.normalize('/foo////bar/////baz/za\baz\bazzz\\..')},
   path.parse('./home/user/dir/file.txt): ${util.inspect(path.parse('./home/user/dir/file.txt'))}

   path.posix: ${util.inspect(path.posix)},
   path.win32: ${util.inspect(path.win32,{depth: null})}
   path.basename('/foo/bar/baz/asdf/quux.html'): ${path.basename('/foo/bar/baz/asdf/quux.html')},
   path.delimiter: ${path.delimiter},
   process.env.PATH: ${process.env.PATH},//// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
   process.env.PATH.split(path.delimiter): ${process.env.PATH.split(path.delimiter)}///// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']


`);
