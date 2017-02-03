var map = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png'
};

var ext = require('path').extname(filename);
if(map[ext]) {
  res.setHeader('Content-type', map[ext]);
}