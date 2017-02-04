'use strict';
let util = require('util');
console.log(`require.cache: ${util.inspect(require.cache, {depth: null, showHidden: true})}`);
console.log('__filename in ./app.js', __filename);
console.log('__dirname in ./app.js', __dirname);
console.log('require.resolve("./console.js")', require.resolve('./console.js'));
// console.log('process.argv', process.argv);
// console.log('process.env', process.env);