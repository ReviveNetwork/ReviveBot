const Message = require('./../../orm/Message');
const m2e = require('./../lib/message2embed');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1)
        return message.reply("incorrect usage\nSyntax: ~qoute <messageID>");
    let m = Message.where('messageID', params[0]).fetch().message();
    message.channel.sendEmbed(m2e(m));
}
/**
 * description of the command
 */
const description = "qoutes a message via id";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
