const bf2 = require('revive-stats.js').bf2;
const p2str = require('./p2str');
module.exports = (message) => {
    let nick = message.content.substring(5).trim();
    bf2.getPlayers(nick).then(plist => {
        if (plist.length == 0) {
            message.channel.sendMessage("Player not found");
            return;
        }
        p2str(plist[0], "bf2").then(pl => message.channel.sendMessage(pl).then(msg => {
            msg.react(':arrow_right:');
            msg.react(':arrow_left:');
            msg.react(':fast_forward:');
            msg.react(':rewind:');
            bot.emit('addNav', { message: msg, arr: plist, game: "bf2" });
        }));
    }).catch(message.channel.sendMessage);
}