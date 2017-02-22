const bf2142 = require('revive-stats.js').bf2142;
const p2str = require('./p2str');
const bot = require('../utils/bot');
module.exports = (message) => {
    let nick = message.content.substring(7).trim();
    bf2142.getPlayers(nick).then(plist => {
        console.log(plist[0]);
        if (plist.length == 0) {
            message.channel.sendMessage("Player not found");
            return;
        }
        p2str(plist[0], "bf2142").then(pl => {
            message.channel.sendMessage(pl).then(msg => {
                msg.react('➡');
                msg.react('⬅');
                msg.react('⏩');
                msg.react('⏪');
                bot.emit('addNav', { message: msg, arr: plist, game: "bf2142" ,index:0});
            })
        });
        console.log(res);
    }).catch(message.channel.sendMessage);
}
