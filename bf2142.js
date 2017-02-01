const request = require('request');
module.exports = {};
var exports = module.exports;
exports.getPlayers = function(nick,callback) {
    console.log("GET PLAYERS BF2142");
    var playerlist = new Array();
    request('http://s.bf2142.us/playersearch.aspx?auth=' + exports.getAuthToken(00000000) + '&nick=' + nick,function (error, response, body) {
    console.log(body);
    var collection = body.split("\n");
    console.log(collection);
    var index = collection.indexOf('H\tpid\tnick')+1;
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

        p = new exports.player(p[1], p[2]);
        playerlist.push(p);

        index++;
    }
    console.log(playerlist);
    callback(playerlist);
	});
};
exports.player = function(pid_, nick_) {
    this.nick = nick_;
    this.pid = pid_;
    this.link =  "<https://bl2142.co/bfhq.php?pid=" + this.pid + ">";
};
exports.getAuthToken = function(pid) {
    var authToken = "";
    request("GET", 'https://bf2142auth.herokuapp.com?=' + pid,function (error, response, body) {
    //console.log(authToken);

    console.log(authToken);
    return authToken;
	});
}
exports.str = function(player)
{
		return player.nick+"\t\t"+player.link;
}