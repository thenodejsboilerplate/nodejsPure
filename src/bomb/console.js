'use strict';

/**
 * console constructor
 *  */
let Console = require('console').Console;//or console.Console
let fs = require('fs');
let output = fs.createWriteStream('./filefolder/stdout.log');
let errorOutPut = fs.createWriteStream('./filefolder/stderr.log');
let logger =  new Console(output, errorOutPut);

// use it like console
var count = 5;
logger.log('count: %d', count);
logger.error('error sample');
logger.warn('warn sample');



/**
 * console global var
 **/
//A simple assertion test that verifies whether value is truthy. If it is not, an AssertionError is thrown. If provided, the error message is formatted using util.format() and used as the error message.
//Specifically, in browsers, calling console.assert() with a falsy assertion will cause the message to be printed to the console without interrupting execution of subsequent code. In Node.js, however, a falsy assertion will cause an AssertionError to be thrown.
console.assert(true, 'does nothing');
// OK
//console.assert(false, 'Whoops %s', 'didn\'t work');
// AssertionError: Whoops didn't work

// Creates a simple extension of console with a
// new impl for assert without monkey-patching.
    // const myConsole = Object.setPrototypeOf({
    // assert(assertion, message, ...args) {
    //     try {
    //     console.assert(assertion, message, ...args);
    //     } catch (err) {
    //     console.error(err.stack);
    //     }
    // }
    // }, console);
    // myConsole.assert(false, 'Whoops %s', 'didn\'t work');
    // console.log('end');


/**
 * console.dir/util.inspect
 * 
 */
const util = require('util');
//console.log(util.inspect(util, { showHidden: true, depth: null,colors: true }));
//, which is equl to: 
console.dir(util, { showHidden: true, depth: null,colors: true });

console.log(`util.inspect.colors.grey: ${util.inspect.colors.grey}, util.inspect.styles.number: ${util.inspect.styles.number}`);

//If the first argument is not a format string then util.format() returns a string that is the concatenation of all arguments separated by spaces. Each argument is converted to a string using util.inspect().
console.log(
    util.format('%s:%s', 'foo', 'bar', 'baz', {mything: 666, thisf: [5,6,'dfk']}) // 'foo:bar baz'
);




console.time('foreach during');
let y;
for(let i=0;i<20;i++){
  y = i;
}
console.timeEnd('foreach during');
//foreach during: 0.814ms




//logger.log/error/warn
// The global console is a special Console whose output is sent to process.stdout and process.stderr. It is equivalent to calling:
// new Console(process.stdout, process.stderr);

// The module exports two specific components:

// A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
// A global console instance configured to write to stdout and stderr. Because this object is global, it can be used without calling require('console').

