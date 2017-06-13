const bf2142 = require('revive-stats.js').bf2142;
const p2str = require('./../lib/p2str');
const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let nick = params[0];
    try{
        const plist = await bf2142.getPlayers(nick);
        if (plist.length == 0) {
            message.channel.send("Player not found");
            return;
        }
        const pl = await p2str(plist[0], "bf2142")
        const msg = await message.channel.send(pl);
        if (plist.length === 1) return;
        await msg.react('⏪')
        await msg.react('◀')
        await msg.react('▶')
        await msg.react('⏩')
        bot.emit('addNav', { message: msg, exec: (p) => p2str(p, "bf2142"), arr: plist, index: 0 });
        }));
    }
    catch(e){
        message.reply("No such user found");
    }
}
/**
 * description of the command
 */
const description = "shows bf2142 stats of the username provided";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
