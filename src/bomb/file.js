'use strict';
var fs = require('fs');

//Fully buffered reads and writes are fairly straightforward: call the function and pass in a String or a Buffer to write, and then check the return value.

// (fully buffered)
fs.readFile('../../welcome.html', 'utf8', function(err,data){
  console.log(err?err:`welcome.html's data is ${data}`);

});
// (fully buffered)
fs.writeFile('../../results.txt', 'Hello World', function(err) {
  if(err) throw err;
  console.log('fully buffered, File write completed');
});

//When we want to work with files in smaller parts, we need to open(), get a file descriptor and then work with that file descriptor.

//fs.open(path, flags, [mode], [callback]) supports the following flags:
// 'r' - Open file for reading. An exception occurs if the file does not exist.
// 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
// 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
// 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
// 'a' - Open file for appending. The file is created if it does not exist.
// 'a+' - Open file for reading and appending. The file is created if it does not exist.
// mode refers to the permissions to use in case a new file is created. The default is 0666.


//Recipe: Opening, writing to a file and closing it (in parts)
//fs.write(fd, string[, position[, encoding]], callback)
//fs.write(fd, buffer[, offset[, length[, position]]], callback) Added in: v0.0.2
//offset and length determine the part of the buffer to be written.position refers to the offset from the beginning of the file where this data should be written. 
let dir;
if(require.main === module){
  dir = '../../src/data/';
}else{
  dir = './src/data/';
}

fs.open(`${dir}1.html`, 'w', function(err,fd){
  if(err) throw err;
  let buf = new Buffer('bbbb\n bbb');
  fs.write(fd, buf,0,buf.length,null,function(err,written,buffer){
    if(err) throw err;
    console.log(`err: ${err},written: ${written}; buffer: ${buffer}`);
    fs.close(fd, function(){
      console.log('Done');
    });
  });
});


// Reading a directory returns the names of the items (files, directories and others) in it.


fs.readdir(dir, function (err, files) {
  if(err) throw err;
  files.forEach(function(file) {
    console.log(dir+file);
    fs.stat(dir+file, function(err, stats) {
      console.log(err?err : `stats in fs.stat: ${JSON.stringify(stats,null,' ')}`);
//  stats:
//  {
//  "dev": -1773846389,
//  "mode": 33206,
//  "nlink": 1,
//  "uid": 0,
//  "gid": 0,
//  "rdev": 0,
//  "ino": 4222124651022759,
//  "size": 0,
//  "atime": "2016-12-23T06:09:12.144Z",
//  "mtime": "2016-12-23T06:18:27.611Z",
//  "ctime": "2016-12-23T06:18:27.611Z",
//  "birthtime": "2016-12-23T06:09:12.144Z"
// }

//  The stat object also has the following functions:

// stats.isFile()
// stats.isDirectory()
// stats.isBlockDevice()
// stats.isCharacterDevice()
// stats.isSymbolicLink() (only valid with fs.lstat())
// stats.isFIFO()
// stats.isSocket()Creating and deleting a directory


//Creating and deleting a directory

    });
  });
});


fs.stat('../../newdir', function(err,stats){
  if(!stats) {
    fs.mkdir('../../newdir', '0666', function(err) {
      if(err) throw err;
      console.log('Created newdir');
      fs.rmdir('../../newdir', function(err) {
        if(err) throw err;
        console.log('Removed newdir');
      });
    });
  }else{
    console.log('dir-newdir exists');
  }

});


var file = fs.createReadStream(dir+'results.txt', {flags: 'r'} );
var out = fs.createWriteStream(dir+'results2.txt', {flags: 'w'});
file.pipe(out);
//or like
// var file = fs.createReadStream('./data/results.txt', {flags: 'r'} );
// var out = fs.createWriteStream('./data/results2.txt', {flags: 'w'});
// file.on('data', function(data) {
//   console.log('data', data);
//   out.write(data);
// });
// file.on('end', function() {
//   console.log('end');
//   out.end(function() {
//     console.log('Finished writing to file');
//    // test.done();
//   });
// });

//Appending to a file
var appendFile = fs.createWriteStream(dir+'resultsAppend.txt', {flags: 'a'} );
appendFile.write('HELLO!\n');
appendFile.end(function() {
  console.log('append file successfully');
});



 //searching for a file in a directory, traversing recursively
// function findFile(path, searchFile, callback) {
//   fs.readdir(path, function (err, files) {
//     if(err) { return callback(err); }
//     files.forEach(function(file) {
//       fs.stat(path+'/'+file, function(err,stats) {
//         if(err) { return callback(err); }
//         if(stats.isFile() && file == searchFile) {
//           callback(undefined, path+'/'+file);
//         }else if(stats.isDirectory()) {
//           findFile(path+'/'+file, searchFile, callback);
//         }
//       });
//     });
//   });
// }
var PathIterator = require('../common/recursivelyTranversingAFileinADir.js');
function findFile(path, searchFile, callback) {
  var pi = new PathIterator();
  pi.on('file', function(file, stats) {
    if(file == searchFile) {
      callback(undefined, file);
    }
  });
  pi.on('error', callback);
  pi.iterate(path);
}

findFile(dir, '1.html', function(err, path) {
  if(err) { 
    console.log(`error: ${err.message}`);
    throw err; 
  }
  console.log('Found file at: '+path);
});






fs.open('../filefolder/myfile.log', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {

// if(err.code === "EEXIST") {
//       console.error('myfile already exist');
//       return;
// }     
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  }
  //readMyData(fd);
  console.log('you can read data');
});


fs.appendFile(dir+'message.txt', 'data to append vv','utf8', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});


//Note: The fs.mkdtemp() method will append the six randomly selected characters directly to the prefix string. For instance, given a directory /tmp, if the intention is to create a temporary directory within /tmp, the prefix must end with a trailing platform-specific path separator (require('path').sep).
// This method is *INCORRECT*:

// The parent directory for the new temporary directory
//const tmpDir = '/tmp';
// fs.mkdtemp(tmpDir, (err, folder) => {
//   if (err) throw err;
//   console.log(folder);
//   // Will print something similar to `/tmpabc123`.
//   // Note that a new temporary directory is created
//   // at the file system root rather than *within*
//   // the /tmp directory.
// });

// This method is *CORRECT*:
const path = require('path');
console.log(`path.sep: ${path.sep}`);
const tmpDir = `.${path.sep}newdir`;
fs.mkdtemp(tmpDir + path.sep, (err, folder) => {
  if (err) throw err;
  console.log(folder);
  // Will print something similar to `/tmp/abc123`.
  // A new temporary directory is created within
  // the /tmp directory.
});