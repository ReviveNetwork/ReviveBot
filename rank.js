const request = require('request-promise');
const Discord = require('discord.js');
module.exports = {};
exports = module.exports;
exports.rank = function(message)
{
	var id = message.mentions.users.first() || message.author;
	id = id.id;
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id).then(body =>{
		body = JSON.parse(body).catch(message.reply);
		if(body.error)
		{message.reply("The requested user hasnt linked his discord account with thier revive account");return;}
		for(var i=0;i<body.soldiers.length;i++)
		{
			var soldier = body.soldiers[i];
			var game = soldier.game=="stella"?require('./bf2142'):require('./bf2');
			var ranklink = soldier.game=='stella'?'http://files.2142-stats.com/2142/ranks/':'https://battlelog.co/img/ranks/rank_'
			game.getrank(soldier.pid).then(rank => {
			var embed = new Discord.RichEmbed()
			.setTitle(soldier.nickname)
			.setThumbnail((soldier.game=='stella'?ranklink+rank+'.jpg':ranklink+rank+'.png'))
			.addField("Game: ",(soldier.game== "stella" ? "Battlefield 2142" : "Battlefield 2"))
			.addField("Online: ",(soldier.online == 1 ? "yes" : "no"))
			.addField("Last Active: ",soldier.last_active)
			.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=")+soldier.pid)
			.setFooter(soldier.time_created)
			.setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
			message.channel.sendEmbed(embed);
			});
		}
	});
}
