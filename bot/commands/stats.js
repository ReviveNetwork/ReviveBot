const settings = require('./../../settings.json');
const Discord = require('discord.js');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    const guild = message.guild;
    let embed = new Discord.RichEmbed()
        .setThumbnail(guild.iconURL)
        .setTitle(guild.name)
        .setAuthor(guild.owner.user.username, guild.owner.user.displayAvatarURL)
        .setTimestamp(guild.createdAt)
        .addField('Members: ', guild.memberCount, true)
        .addField('Online: ', guild.presences.map(p => p.status != 'offline').length, true)
        .addField('Region: ', guild.region, true);
    let r ='__**Roles**__:\n'
    guild.roles.map((role) =>{
		if(role.name !='@everyone')
		r = r + "**"+role.name+"**: "+role.members.size+'\n';
	});
    embed.setDescription (r);
    let members = await message.guild.fetchMembers();
    let data = [];
    members.map(function(m){
	    let date = m.joinedAt;
	    date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
	    let key = data.findIndex(d =>{
		    if(d[0] ==date)
			    return d;
	    });
	    if(key && key >=0)
		    data[key][1]++;
	    else
		    data.push([date,1]);
    });
    return message.channel.send('', { embed: embed }).catch(message.channel.send);
}
/**
 * description of the command
 */
const description = "Shows server stats";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
