const request = require('request-promise');
const Discord = require('discord.js');
const revive = require('revive-stats.js')
const moment = require('moment');
module.exports = function (message) {
	if (message.mentions.users.size === 0 && message.content.length > 6) {
		message.reply("Usage:\n~info - shows your stats" +
			"\n~info <usermention> - shows stats of the user mentioned\n"
			+ "(the user should have linked his forum account with his discord account)");
		return;
	}
	var id = message.mentions.users.first() || message.author;
	id = id.id;
	let all = false;
	if (id === message.author.id) all = true;
	let arr = [];
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id).catch(err => { console.log(err); message.channel.sendMessage('api down') }).then(body => {
		try { body = JSON.parse(body) } catch (e) { console.log("error: " + body); }
		console.log(body);
		if (body.error)
		{ message.reply("The requested user hasnt linked his discord account with thier revive account"); return; }
		for (let i = 0; i < body.soldiers.length; i++) {
			let soldier = body.soldiers[i];
			if (!all) {
				if (soldier.nickname != body.username)
					continue;
			}
			let gameob = soldier.game == "stella" ? revive.bf2142 : revive.bf2;
			let ranklink = soldier.game == 'stella' ? 'https://github.com/ReviveNetwork/ReviveBot/raw/master/img/bf2142/rank_' : 'https://battlelog.co/img/ranks/rank_'
			gameob.getPlayer(soldier.pid).then(rank => {
				if (!rank) { throw new Error("Player" + soldier.nickname + " Doesnt have any stats") }
				let embed = new Discord.RichEmbed()
					.setTitle(soldier.nickname)
					.setThumbnail(ranklink + rank.rank + '.png')
					.addField("Game: ", (soldier.game == "stella" ? "Battlefield 2142" : "Battlefield 2"), true)
					.addField("Rank: ", (soldier.game == "stella" ? require('../../data/bf2142rank.json') : require('../../data/bf2rank.json'))[rank.rank], true)
					.addField("Online: ", (soldier.online == 1 ? "yes" : "no"), true)
					.addField("Last Active: ", moment(soldier.last_active, "YYYY-MM-DD HH:mm:ss").fromNow(), true)
					.addField("KDR: ", rank.kdr, true)
					.addField("Kills per Minute: ", rank.killsPM, true)
					.addField("Deaths per Minute: ", rank.deathsPM, true)
					.addField("Favourite Kit: ", rank.favKit, true)
					.addField("Favourite Vehicle: ", rank.favVehicle, true)
					.addField("Heals: ", rank.heals, true)
					.addField("Revives: ", rank.revives, true);
				((rank.topOpponentName) ? (embed.addField("Top Opponent: ", rank.topOpponentName, true).addField("Top Victim: ", rank.topVictimName, true)) : "");
				embed.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=") + soldier.pid)
					.setFooter("Created " + moment(soldier.time_created, "YYYY-MM-DD HH:mm:ss").fromNow())
					.setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
				message.channel.sendEmbed(embed).catch(message.channel.sendMessage);
			});
		}
	});
}
