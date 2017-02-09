//As a best practice, warnings should be emitted only once per process. To do so, it is recommended to place the emitWarning() behind a simple boolean flag as illustrated in the example below:

'use strict';
let warned = false;
let env = process.env.NODE_ENV || 'develop';
/**
 * @param message [String] type [String], default: DeprecationWarning
 */
process.on('uncaughtException', (err) => {
  //fs.writeSync(1, `Caught exception: ${err}`);
  process.emitWarning('do not use uncaughtException method unless you have to');
  console.log(`Caught exception: ${err}`);
});

process.on('warning', (warning) => {
  console.warn('Warning!');
 //you can set it yourself like:  warning.message = `Trver: ${warning.message}`;
  if(env === 'develop') {
    console.log(
      `
       warning.name: ${warning.name},
       warning.message: ${warning.message},
       warning.stack: ${warning.stack}
     `
  );
  }

});
function emitMyWarning(message,type='DeprecationWarning') {
  if (!warned) {
    process.emitWarning(message, type);
    warned = true;
  }
}
exports.emitMyWarning = emitMyWarning;