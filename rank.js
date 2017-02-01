const request = require('request');
const Discord = require('discord.js');
module.exports = {};
exports = module.exports;
exports.rank = function(message)
{
	const id = message.mentions.users.first().id;
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id,function (error, response, body) {
		body = JSON.parse(body);
		for(var i=0;i<body.soldiers.length;i++)
		{
			var soldier = body.soldiers[i];
			var embed = new Discord.RichEmbed()
			.setTitle(soldier.nickname)
			.setThumbnail(body.gravatar)
			.addField("Game: ",(soldier.game== "stella" ? "Battlefield 2142" : "Battlefield 2"))
			.addField("Online: ",(soldier.online == 1 ? "yes" : "no"))
			.addField("Last Active: ",soldier.last_active)
			.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=")+soldier.pid)
			.setFooter(soldier.time_created)
			.setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
			message.channel.sendEmbed(embed);
		}
	});
}