const request = require('../utils/rp');
module.exports = function (message) {
    var msg = message.content.substring(9).trim();
    var call = function (body) {
        console.log(body);
        message.channel.sendCode("javascript", body, { split: true });
    };
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    request(msg).then(call).catch(message.reply);
}
