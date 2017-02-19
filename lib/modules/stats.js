const Discord = require('discord.js');
module.exports= (message)=>{
	const guild = message.guild;
	let embed = new Discord.RichEmbed()
	.setThumbnail(guild.iconURL)
	.setTitle(guild.name)
	.setAuthor(guild.owner.user.username,guild.owner.user.displayAvatarURL)
	.setFooter("formed on "+guild.createdAt)
	.addField('Members: ',guild.memberCount,true)
	.addField('Online: ',guild.presences.map(p =>p.status!='offline').length,true)
	.addField('Region: ',guild.region,true);
	guild.roles.map((role) =>{
		if(role.name !='@everyone')
		embed.addField(role.name+": ",role.members.size,true);
	});
	message.channel.sendEmbed(embed).catch(message.channel.sendMessage);
}
