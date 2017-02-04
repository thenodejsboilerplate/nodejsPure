let log = console.log;
let util = require('util');
if(require.main === module){
  log('required directly');
}else{
  log('required from other place');
}

//You can require specific files or sub modules distributed with a module by including a path suffix after the module name. For instance require('example-module/path/to/file') would resolve path/to/file relative to where example-module is located. The suffixed path follows the same module resolution semantics.
let jey = require('jey/package.json');
let index = require('jey/index');
//console.log(jey);


console.log(`
    module.filename: ${module.filename},
    children of the module: ${util.inspect(module.children, {depth:1})}
`);

log(
    `module.filename: ${module.filename},
    __filename: ${__filename},
    require.main.filename: ${require.main.filename}
    `
);