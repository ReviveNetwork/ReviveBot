const request = require('../utils/rp');
const split = require('./split');
module.exports = function (message) {
    var msg = message.content.substring(9).trim();
    var call = function (body) {
        message.channel.sendCode("Javascript", body, { split: true });
    };
    if (msg.startsWith('{'))
        msg = JSON.parse(msg)
    request(msg).then(call).catch(message.reply);
}
