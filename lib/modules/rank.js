const request = require('request-promise');
const Discord = require('discord.js');
const revive = require('revive-stats.js')
const moment = require('moment');
module.exports = function (message) {
	var id = message.mentions.users.first() || message.author;
	id = id.id;
	let all = false;
	if (id === message.author.id) all = true;
	request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id).catch(err => { console.log(err); message.channel.sendMessage('api down') }).then(body => {
		try { body = JSON.parse(body) } catch (e) { console.log("error: " + body); }
		console.log(body);
		if (body.error)
		{ message.reply("The requested user hasnt linked his discord account with thier revive account"); return; }
		for (let i = 0; i < body.soldiers.length; i++) {
			if (!all)
				if (soldier.nickname != body.username)
					continue;
			let soldier = body.soldiers[i];
			let gameob = soldier.game == "stella" ? revive.bf2142 : revive.bf2;
			let ranklink = soldier.game == 'stella' ? 'https://github.com/ReviveNetwork/ReviveBot/raw/master/img/bf2142/rank_' : 'https://battlelog.co/img/ranks/rank_'
			gameob.getPlayer(soldier.pid).then(rank => {
				if (!rank) { throw new Error("Player" + soldier.nickname + " Doesnt have any stats") }
				let kdr = (parseInt(rank.kill) / parseInt(rank.deth));
				if (isNaN(kdr)) kdr = parseFloat(rank.kdr) * 100;
				kdr = kdr.toFixed(2);
				let embed = new Discord.RichEmbed()
					.setTitle(soldier.nickname)
					.setThumbnail(ranklink + rank.rank + '.png')
					.addField("Game: ", (soldier.game == "stella" ? "Battlefield 2142" : "Battlefield 2"), true)
					.addField("Rank: ", (soldier.game == "stella" ? require('../../data/bf2142rank.json') : require('../../data/bf2rank.json'))[rank.rank], true)
					.addField("Online: ", (soldier.online == 1 ? "yes" : "no"), true)
					.addField("Last Active: ", moment(soldier.last_active, "YYYY-MM-DD HH:mm:ss").fromNow(), true)
					.addField("KDR: ", kdr, true)
					.addField("Kills per Minute: ", parseFloat(rank.klpm || (parseFloat(rank.kpm) * 100)).toFixed(2), true)
					.addField("Deaths per Minute: ", parseFloat(rank.dtpm || (parseFloat(rank.dpm) * 100)).toFixed(2), true)
					.addField("Heals: ", (rank.heal || rank.hls), true)
					.addField("Revives: ", (rank.rviv || rank.rvs), true);
				((rank.vmns) ? (embed.addField("Fallen Victim: ", rank.vmns, true).addField("Bashed: ", rank.mvns, true)) : "");
				embed.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=") + soldier.pid)
					.setFooter("Created " + moment(soldier.time_created, "YYYY-MM-DD HH:mm:ss").fromNow())
					.setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
				message.channel.sendEmbed(embed).catch(message.channel.sendMessage);
			});
		}
	});
}
