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
        let ch = bot.channels.get(m.attributes.channel);
        m = await ch.fetchMessage(m.attributes.messageID);
    }
    else {
        m = await message.channel.fetchMessage(params[0]);
        if (!m)
            return message.reply("message not available");
    }
    console.log("fetching : " + m.id);
    let attach = m.attachments.first();
    let em = m2e(m);
    console.log(em);
    if (attach)
        attach = attach.url;
    message.channel.send((params[1])?(message.author.toString()+": "+params.slice(1).join(" ")):(""), { embed:em , file: attach }).catch(console.error);
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
