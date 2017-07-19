const Message = require('./../../orm/Message');
module.exports = message => {
    new Message({
        messageID: message.id,
        channel: message.channel.id
    }).save();
}