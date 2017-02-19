const request = require('request');
module.exports = function (message) {
    var msg = message.content.substring(9).trim();
    var call = function (error, response, body) {
        if (error) {
            message.reply(error);
        } else {
            message.channel.sendMessage("```Javascript\n" + body + '```',{split:true});
        }
    };
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    request(msg, call);
}
