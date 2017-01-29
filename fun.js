const bot = require('./bot');
var math = require('mathjs');

bot.on('message', message => {
    if (message.content.toLowerCase().startsWith('~count')) {
        c = parseInt(message.content.split(' ')[1]) || 10;
        message.channel.sendMessage('counting').then(msg => count(c, msg));
    }
    if (message.content.toLowerCase().startsWith('~calc')) {
       var res = message.content.match(/^[ 0-9\/\+\-\*]+/);
       message.channel.sendMessage(math.eval(res));
    }
});
var count = function(c, message) {
    if (c <= 0) {
        message.edit("Boom");
        return;
    }
    message.edit(c);
    setTimeout(count(c - 1, message), 3000);
};
