'use strict';
const os = require('os');
const util = require('util');
const log = console.log;

console.log(`
    
    os.EOL: ${JSON.stringify(os.EOL)},
    os.arch(): ${os.arch()} is equal to ${process.arch},
    os.constants: ${os.constants},
    os.cpus(): ${util.inspect(os.cpus())},
    os.freemem(): ${os.freemem()/1024/1024/1024}G,/*os.freemem return bytes*/,
    os.totalmem(): ${os.totalmem()/1024/1024/1024}G,/*os.totalmem return bytes*/,
    os.homedir(): ${os.homedir()},
    os.hostname(): ${os.hostname()},
    os.loadavg(): ${os.loadavg()},
    os.networkInterfaces(): ${util.inspect(os.networkInterfaces(), {depth: null})},
    os.platform: ${os.platform()} is equl to ${process.platform},
    os.release: ${os.release()},
    os.tmpdir(): ${os.tmpdir()},
    os.type: ${os.type()},
    os.uptime(): ${os.uptime()/60/60}H,
    os.userInfo(): ${util.inspect(os.userInfo(), {depth: null})},

`);

log(`thisis is a boy.${os.EOL} IA MA A BOY THIS IS HAH.`);
log(`thisis is a boy. IA MA A BOY THIS IS HAH.`);