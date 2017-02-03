// searching for a file in a directory, traversing recursivelysearch for a file recursively starting from a given path. The function takes three arguments: a path to search, the name of the file we are looking for, and a callback which is called when the file is found

// var fs = require('fs');

// function findFile(path, searchFile, callback) {
//   fs.readdir(path, function (err, files) {
//     if(err) { return callback(err); }
//     files.forEach(function(file) {
//       fs.stat(path+'/'+file, function() {
//         if(err) { return callback(err); }
//         if(stats.isFile() && file == searchFile) {
//           callback(undefined, path+'/'+file);
//           }
//         } else if(stats.isDirectory()) {
//           findFile(path+'/'+file, searchFile, callback);
//         }
//       });
//     });
//   });
// }

// findFile('./test', 'needle.txt', function(err, path) {
//   if(err) { throw err; }
//   console.log('Found file at: '+path);
// });

// Improving reuse by using an EventEmitter
//creating our own module (pathiterator.js), which treats directory traversal as a stream of events by using EventEmitter:
'use strict';
var fs = require('fs'),
  EventEmitter = require('events').EventEmitter,
  util = require('util');

//var PathIterator = function() {};
class PathIterator extends EventEmitter{

  constructor(){
    super();
  }//or deleted
  iterate(path) {
    let self = this;
    this.statDirectory(path, function(fpath, stats) {
      if(stats.isFile()) {
        self.emit('file', fpath, stats);
      } else if(stats.isDirectory()) {
        self.emit('directory', fpath, stats);
        self.iterate(fpath);
      }
    });
  }
  statDirectory(path, callback) {
    let self = this;
    fs.readdir(path, function (err, files) {
      if(err) { self.emit('error', err); }
      files.forEach(function(file) {
        var fpath = path+'/'+file;
        fs.stat(fpath, function (err, stats) {
          if(err) { self.emit('error', err); }
          callback(fpath, stats);
        });
      });
    });
  }



}
// augment with EventEmitter
//util.inherits(PathIterator, EventEmitter);

// Iterate a path, emitting 'file' and 'directory' events.
// PathIterator.prototype.iterate = function(path) {
//   var self = this;
//   this.statDirectory(path, function(fpath, stats) {
//     if(stats.isFile()) {
//       self.emit('file', fpath, stats);
//     } else if(stats.isDirectory()) {
//       self.emit('directory', fpath, stats);
//       self.iterate(path+'/'+file);
//     }
//   });
// };

// Read and stat a directory
// PathIterator.prototype.statDirectory = function(path, callback) {
//   fs.readdir(path, function (err, files) {
//     if(err) { self.emit('error', err); }
//     files.forEach(function(file) {
//       var fpath = path+'/'+file;
//       fs.stat(fpath, function (err, stats) {
//         if(err) { self.emit('error', err); }
//         callback(fpath, stats);
//       });
//     });
//   });
// };

module.exports = PathIterator;







// we create a new class which extends EventEmitter, and emits the following events:

// “error” - function(error): emitted on errors.
// “file” - function(filepath, stats): the full path to the file and the result from fs.stat
// “directory” - function(dirpath, stats): the full path to the directory and the result from fs.stat
// We can then use this utility class to implement the same directory traversal:

// var PathIterator = require('./pathiterator.js');
// function findFile(path, searchFile, callback) {
//   var pi = new PathIterator();
//   pi.on('file', function(file, stats) {
//     if(file == searchFile) {
//       callback(undefined, file);
//     }
//   });
//   pi.on('error', callback);
//   pi.iterate(path);
// }

// You are probably running findFile() as part of some larger process - and instead of having all that file travelsal logic in the same module, you have a fixed interface which you can write your path traversing operations against.