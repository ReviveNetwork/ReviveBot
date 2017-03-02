const request = require('../utils/rp');
module.exports = function (message) {
    var msg = message.content.substring(9).trim();
    var call = function (body, message) {
        console.log(body);
        message.channel.sendCode("javascript", body, { split: true });
    };
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    request(msg).then((body) => call(body, message)).catch(message.reply);
}
