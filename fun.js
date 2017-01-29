const bot = require('./bot');

bot.on('message', message => {
    if (message.content.toLowerCase().startsWith('~count')) {
        c = parseInt(message.content.split(' ')[1]) || 10;
        message.channel.sendMessage('counting').then(msg => count(c, msg));
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
