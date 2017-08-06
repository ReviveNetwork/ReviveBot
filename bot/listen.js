const bot = require('./bot.js');
const modules = require('./modules.js');
const listeners = require('./listeners/listener');

bot.on('error', (err) => console.log("BOT ERROR : " + err.stack));
process.on('uncaughtException', (err) => console.log("UNHANDLED REJECTION : " + err.stack));
process.on('uncaughtException', (err) => console.log("UNHANDLED EXCEPTION : " + err.stack));

bot.on('ready', () => console.log("ReviveBot Ready"));

//Hook listeners

Object.keys(listeners).map(event => {
    listeners[event].map((func, i) => {
        if (!func) return;
        if (typeof func != "function")
            return console.log(event + "[" + i + "] is not a function and hence was not added");
        bot.on(event, func)
    });
})
