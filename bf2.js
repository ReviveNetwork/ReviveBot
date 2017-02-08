const request = require('request-promise');
const toarray = (body) => {
    let playerlist = new Array();
    var collection = body.split("\n");
    console.log(collection);
    var index = collection.indexOf('H\tn\tpid\tnick\tscore')+1;
    if (index > collection.length) {
        return null;
    }
    while (collection[index].startsWith("D")) {
        //console.log(collection[index]);
        var p = collection[index].split("\t");
        //console.log(p[2],p[3],p[4]);
        p = new player(p[2], p[3], p[4]);
	playerlist.push(p);
        index++;
    }
    console.log(playerlist);
    return playerlist;};
const getPlayers = (nick, callback) => request('http://bf2web.game.bf2.us/ASP/searchforplayers.aspx?nick=' + nick + '&where=a&sort=a&debug=txs&transpose=0')
	.catch(console.log)
    .then(toarray)
    .then((playerList) => Promise.all(playerList.map(player => getrank(player.pid))).then((playerRanks) => {
	            playerRanks.forEach((rank, i) => playerList[i].rank = rank);
	            return playerList;
    }));
player = function(pid_, nick_, score_) {
    this.nick = nick_;
    this.pid = pid_;
    this.score = score_;
    this.rank =0;
    this.link =  "<https://battlelog.co/bfhq.php?pid=" + this.pid + ">";
};
exports.str = function(player)
{
 return player.nick+"\t"+player.score+"\t"+player.rank+"\t"+player.link;
}
getrank = (pid,callback) => request('http://bf2web.game.bf2.us/ASP/getrankinfo.aspx?pid=' + pid).catch(console.log).then(body => {
	    var rank=parseInt(body.split('\n')[2].split('\t')[1]);
	    return rank;
	});
exports.getrank = getrank
 exports.getPlayers = getPlayers;

