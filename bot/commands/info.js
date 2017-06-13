const request = require('request-promise-native');
const Discord = require('discord.js');
const revive = require('revive-stats.js')
const moment = require('moment');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
	if (message.mentions.users.size === 0 && params.length > 0) {
		message.reply("Usage:\n~info - shows your stats" + "\n~info <usermention> - shows stats of the user mentioned\n" + "(the user should have linked his forum account with his discord account)");
		return;
	}
	let user = message.mentions.users.first() || message.author;
	let id = user.id;
	let all = false;
    let atleastOne = false;
	if (id === message.author.id) all = true;
	let arr = [];
	let body = await request("http://revive-bot-discord.revive.systems/v0/discord/userinfo/" + id);
	try {
		body = JSON.parse(body)
	} catch (e) {
		console.log("error: " + body);
	}
	console.log(body);
	if (body.error) {
		if (all) return message.reply("Please link your discord account first using `~link`");
		return message.reply("The requested user has not yet linked his discord account with their revive account");
	}
	if (body.banned ==1){
		if (all) return message.reply("You are global banned");
		return message.reply("The requested user has been global banned.");
	}
		
	for (let i = 0; i < body.soldiers.length; i++) {
		let soldier = body.soldiers[i];
		if (!all) {
			if (soldier.nickname != body.username) continue;
		}
		let gameob = soldier.game == "stella" ? revive.bf2142 : revive.bf2;
		let g = soldier.game == "stella" ? 'bf2142' : 'bf2';
		let ranklink = soldier.game == 'stella' ? 'https://raw.githubusercontent.com/ReviveNetwork/ReviveBot/master/img/bf2142/rank_' : 'https://battlelog.co/img/ranks/rank_'
		let rank = null;
        try {
            rank = await gameob.getPlayer(soldier.pid);
        }
        catch(err) {
            continue;
        }
		if (rank ===  null) {
			continue;
		}
		let embed = new Discord.RichEmbed()
		try
		{
		    embed.setTitle(soldier.nickname).setThumbnail(ranklink + rank.rank + '.png')
		    .addField("Game: ", (soldier.game == "stella" ? "Battlefield 2142" : "Battlefield 2"), true)
		    .addField("Rank: ", (soldier.game == "stella" ? require('../../data/bf2142rank.json') : require('../../data/bf2rank.json'))[rank.rank], true)
		    .addField("Online: ", (soldier.online == 1 ? "yes" : "no"), true)
		    .addField("Last Active: ", moment(soldier.last_active, "YYYY-MM-DD HH:mm:ss").fromNow(), true)
		    .addField("KDR: ", rank.kdr, true)
		    .addField("Kills per Minute: ", rank.killsPM, true)
		    .addField("Deaths per Minute: ", rank.deathsPM, true)
		    .addField("Kill Streak: ", rank.bestKillStreak, true)
		    .addField("Death Streak: ", rank.worstDeathStreak, true)
		    .addField("Favourite Kit: ", revive.constants[g].kits[rank.favKit], true)
		    .addField("Favourite Vehicle: ", revive.constants[g].vehicles[rank.favVehicle], true)
		    .addField("Heals: ", rank.heals, true)
		    .addField("Revives: ", rank.revives, true);
			if( rank.topOpponentName && rank.topVictimName && rank.topOpponentName !=null && rank.topVictimName !=null && rank.topOpponentName !='' && rank.topVictimName !='' )
			{
				embed.addField("Top Opponent: ", rank.topOpponentName , true);
				embed.addField("Top Victim: ", rank.topVictimName, true);
			}
		    embed.setURL((soldier.game == "stella" ? "http://bl2142.co/bfhq.php?pid=" : "http://battlelog.co/bfhq.php?pid=") + soldier.pid)
		    .setFooter("Created " + moment(soldier.time_created, "YYYY-MM-DD HH:mm:ss").fromNow())
		    .setColor(soldier.game == "stella" ? "#0000FF" : "#ff0000");
		    await message.channel.send('', { embed: embed});
			atleastOne = true;
		}
		catch(e){
			console.log(e.stack);
			console.log(rank.topOpponentName +" "+ rank.topVictimName)
			console.log(embed);
		}
	}
    if(!atleastOne)
        message.channel.send(user.toString()+" has no soldiers");
}
/**
 * description of the command
 */
const description = "Shows battlelog.co stats";
/**
 * Define Exports
 */
module.exports = {
	execute: command,
	description: description
};
