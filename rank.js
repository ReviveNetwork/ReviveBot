const request = require('request-promise');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = {};
exports = module.exports;
exports.rank = function(message)
{
	var id = message.mentions.users.first() || message.author;
	id = id.id;
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id).then(body =>{
		try{body = JSON.parse(body)}catch(e){console.log("error: "+body);}
		console.log(body);
		if(body.error)
		{message.reply("The requested user hasnt linked his discord account with thier revive account");return;}
		for(let i=0;i<body.soldiers.length;i++)
		{
			let soldier = body.soldiers[i];
			let gameob = soldier.game=="stella"?require('./bf2142'):require('./bf2');
			let ranklink = soldier.game=='stella'?'https://github.com/ReviveNetwork/ReviveBot/raw/master/img/bf2142/rank_':'https://battlelog.co/img/ranks/rank_'
			gameob.getrank(soldier.pid).then(rank => {
			let embed = new Discord.RichEmbed()
			.setTitle(soldier.nickname)
			.setThumbnail(ranklink+rank+'.png')
			.addField("Game: ",(soldier.game== "stella" ? "Battlefield 2142" : "Battlefield 2"))
			.addField("Rank: ",(soldier.game== "stella" ? require('./bf2142rank.json') : require('./bf2rank.json'))[rank])
			.addField("Online: ",(soldier.online == 1 ? "yes" : "no"))
			.addField("Last Active: ",moment(soldier.last_active,"YYYY-MM-DD HH:mm:ss").fromNow())
			.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=")+soldier.pid)
			.setFooter("Created "+moment(soldier.time_created,"YYYY-MM-DD HH:mm:ss").fromNow())
			.setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
			message.channel.sendEmbed(embed);
			});
		}
	});
}
