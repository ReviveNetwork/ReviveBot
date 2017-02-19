const bf2142 = require('revive-stats.js').bf2142;
const str = require('./p2str');
module.exports = (message) => {
    let nick = message.content.substring(5).trim();
    bf2142.getPlayers(nick).then(plist => {
        if (plist.length == 0) {
            message.channel.sendMessage("Player not found");
            return;
        }
        let res = "**S.no.\tName \t link**";
        for (let i = 0; i < plist.length; i++) {
            if (i == 26) {
                res = res + "\n" + (plist.length - 25) +
                    " more players found to Get a full list of players \n" +
                    "<https://battlelog.co/player_search.php?q=" + nick + ">";
                break;
            } else {
                res = res + " \n" + (i + 1) +
                    "\t" + "\t" + str(plist[i], 'bf2');
            }
        }
        message.channel.sendMessage(res);
        console.log(res);
    }).catch(message.channel.sendMessage);
}