const request = require('request-promise');
module.exports = {};
var exports = module.exports;
exports.getPlayers = async function(nick) {
    console.log("GET PLAYERS BF2142");
    var playerlist = new Array();
    await request('http://s.bf2142.us/playersearch.aspx?auth=' +(await exports.getAuthToken(00000000)) + '&nick=' + nick).then(body => {
    console.log(body);
    var collection = body.split("\n");
    console.log(collection);
    var index = collection.indexOf('H\tpid\tnick')+1;
    if (index > collection.length) {
        return null;
    }
    while (collection[index].startsWith("D")){
        var p = collection[index].split("\t");

        p = new exports.player(p[1], p[2]);
	p.rank = await exports.getrank(p.pid);
        playerlist.push(p);

        index++;
    });
    console.log(playerlist);
	});
    return playerlist;
};
exports.player = function(pid_, nick_) {
    this.nick = nick_;
    this.pid = pid_;
    this.rank = 0;
    this.link =  "<https://bl2142.co/bfhq.php?pid=" + this.pid + ">";
};
async exports.getAuthToken = function(pid) {
    var authToken = "";
    request('https://bf2142auth.herokuapp.com?=' + pid).then(body => return body.trim()).catch(error => console.log(error));
}
exports.str = function(player)
{
		return player.nick+"\t"+player.rank+"\t"+player.link;
}
exports.getrank = async function(pid){
	request('http://s.bf2142.us/getplayerinfo.aspx?auth='+exports.getAuthToken(pid)+'&mode=base').then(body =>{
         var rank = parseInt(body.split('\n')[4].split('\t')[5]);
	return rank;
	});
}
