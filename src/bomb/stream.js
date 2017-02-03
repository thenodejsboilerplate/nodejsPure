'use strict';
var fs = require('fs');
module.exports = function(specificFile){

  var readStreamFile = fs.createReadStream(specificFile);
  readStreamFile.on('error', function(err) {
    console.log('Error '+err);
    throw err;
  });
  readStreamFile.on('data', function(data) {
    console.log('Data '+data);
  });
  readStreamFile.on('end', function(){
    console.log('Finished reading all of the data');
  });


  let writeStreamFile = fs.createWriteStream('./out.txt');

  process.stdin.on('data', function(data) {
    writeStreamFile.write(data);
  });
  process.stdin.on('end', function() {
    writeStreamFile.end();
  });  



//You can also pipe readable and writable streams using readableStream.pipe(destination, [options]). This causes the content from the read stream to be sent to the write stream, so the program above could have been written as:
//   const fs = require('fs');
//   process.stdin.pipe(fs.createWriteStream('./out.txt'));
//   process.stdin.resume();



};