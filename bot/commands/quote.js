const Message = require('./../../orm/Message');
const m2e = require('./../lib/message2embed');
const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1)
        return message.reply("incorrect usage\nSyntax: ~quote <messageID>");
    let m = await Message.where('messageID', params[0]).fetch();
    if (m) {
        console.log(m);
        const ch = bot.channels.get(m.attributes.channel);
        m = await ch.fetchMessage(m.attributes.messageID);
        console.log("fetching : "+m.id);
        m =m2e(m);
        console.log(m);
        ch.sendEmbed(m,{files:m.attachments.array()}).catch(console.error);
    }
    else
        message.reply("message not available");
}
/**
 * description of the command
 */
const description = "quotes a message via id";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
