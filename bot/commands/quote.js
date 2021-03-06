const Message = require('./../../orm/Message');
const m2e = require('./../lib/message2embed');
const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (params.length < 1) {
        await message.reply("incorrect usage\nSyntax: ~quote <messageID>");
        return false;
    }
    let m = await Message.where('messageID', params[0]).fetch();
    if (m) {
        console.log(m);
        let ch = bot.channels.get(m.attributes.channel);
        m = await ch.fetchMessage(m.attributes.messageID);
    }
    else if (params[0].startsWith('-')) {
        params[0] = parseInt(params[0].substring(1));
        m = await message.channel.fetchMessages({ limit: params[0] });
        m = m.last();
    }
    else {
        m = await message.channel.fetchMessage(params[0]);
    }
    if (!m) {
        await message.reply("message not available");
        return false;
    }
    console.log("fetching : " + m.id);
    let attach = m.attachments.map(a => a.url);
    let em = await m2e(m);
    console.log(em);
    await message.channel.send((params[1]) ? (message.author.toString() + ": " + params.slice(1).join(" ")) : (""), { embed: em, files: attach });
    return true;
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
    description: description,
    fun: true
};
