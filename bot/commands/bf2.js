const bf2 = require('revive-stats.js').bf2;
const bot = require('./../bot');
const p2str = require('./../lib/p2str');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let nick = params[0];
    try {
        const plist = await bf2.getPlayers(nick);
        if (plist.length == 0) {
            message.channel.send("Player not found");
            return false;
        }
        const pl = await p2str(plist[0], "bf2")
        const msg = await message.channel.send(pl);
        if (plist.length === 1) return;
        await msg.react('⏪')
        await msg.react('◀')
        await msg.react('▶')
        await msg.react('⏩')
        bot.emit('addNav', { message: msg, exec: (p) => p2str(p, "bf2"), arr: plist, index: 0 });
        return true;
    }
    catch (e) {
        await message.reply("API error");
        return false;
    }
}
/**
 * description of the command
 */
const description = "shows bf2 stats of the username provided";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    fun: true
};
