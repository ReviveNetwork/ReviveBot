const request = require('sync-request');
module.exports = {};
var exports = module.exports;
exports.getPlayers = function(nick) {
    console.log("GET PLAYERS BF2");
    var playerlist = new Array();
    var body = request("GET", 'http://bf2web.game.bf2.us/ASP/searchforplayers.aspx?nick=' + nick + '&where=a&sort=a&debug=txs&transpose=0').getBody('utf8');
    var collection = body.split("\n");
    console.log(collection);
    var index = 4;
    if (index > collection.length) {
        return null;
    }
    while (collection[index].startsWith("D")) {
        /*
        if(index==30)
        {
        playerlist.push(collection.length-27+"more players found"+"\n"
        +"to Get a full list of players \n"
        +"<https://battlelog.co/player_search.php?q="+nick+">");
        break;
    }
    */
        //console.log(collection[index]);
        var p = collection[index].split("\t");
        //console.log(p[2],p[3],p[4]);
        p = new exports.player(p[2], p[3], p[4]);
        playerlist.push(p);

        index++;
    }
    //console.log(playerlist);
    return playerlist;
};
exports.player = function(pid_, nick_, score_) {
    this.nick = nick_;
    this.pid = pid_;
    this.score = score_;
    this.str = function() {
            return this.nick + "\t" + this.pid + "\t" + this.score + "\t" + "<https://battlelog.co/bfhq.php?pid=" + this.pid + ">";
        }
};

