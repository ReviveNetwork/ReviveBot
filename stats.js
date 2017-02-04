const bot = require('./bot');
const Discord = require('discord.js');
module.exports= {};
exports= module.exports;
let stats = (message)=>{
	const guild = message.guild;
	let embed = new Discord.RichEmbed()
	.setThumbnail(guild.iconURL)
	.setTitle(guild.name)
	.setAuthor(guild.owner.user.name,guild.owner.user.displayAvatarURL)
	.setFooter(guild.createdAt)
	.addField('Members: ',guild.memberCount)
	.addField('Online: ',guild.presences.map(p =>p.status!='offline').length)
	.addField('Region: ',guild.region);
	guild.roles.map((role) =>{
		embed.addField(role.name+": ",role.members.size);
	});
	message.channel.sendEmbed(embed);
}
exports.stats= stats;
