const request = require('request-promise');
module.exports = {};
exports = module.exports;
const toArray = (body) => {
    console.log(body);
    let playerlist = new Array();
    let collection = body.split("\n");
    console.log(collection);
    let index = collection.indexOf('H\tpid\tnick')+1;
    if (index > collection.length) {
        return null;
    }
    while (collection[index].startsWith("D")){
        var p = collection[index].split("\t");

        p = new player(parseInt(p[1]), p[2]);
        playerlist.push(p);

        index++;
    };
    console.log(playerlist);
    return playerlist;
};
const getPlayers = (nick) => getAuthToken(0).then(auth => request('http://s.bf2142.us/playersearch.aspx?auth=' +auth + '&nick=' + nick ))
    .then(toArray)
    .then((playerList) => Promise.all(playerList.map(player => getrank(player.pid))).then((playerRanks) => {
	            playerRanks.forEach((rank, i) => playerList[i].rank = rank);
	            return playerList;
	        }));

const player = function(pid_, nick_) {
    this.nick = nick_;
    this.pid = pid_;
    this.rank = 0;
    this.link =  "<https://bl2142.co/bfhq.php?pid=" + this.pid + ">";
};
const getAuthToken = (pid) =>request('http://bf2142auth.herokuapp.com?pid=' + pid).then(body => {body=body.trim();
	console.log(body);
        return body;});

exports.str = function(player)
{
		return player.nick+"\t"+player.rank+"\t"+player.link;
}
const getrank = (pid)=>getAuthToken(pid).then(auth => request('http://s.bf2142.us/getplayerinfo.aspx?auth='+auth+'&mode=base')).then((body) =>{
	console.log(body);
         var rank = parseInt(body.split('\n')[4].split('\t')[5]);
	return rank;
	});

exports.getrank = getrank;
exports.getPlayers = getPlayers;
