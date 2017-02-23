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
            if (plist.length === 1) return;
            msg.react('▶').then(
                msg.react('◀')).then(
                msg.react('⏩')).then(
                msg.react('⏪'))
            bot.emit('addNav', { message: msg, arr: plist, game: "bf2", index: 0 });
        }));
    }).catch(message.channel.sendMessage);
}
