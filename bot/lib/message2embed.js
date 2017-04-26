const Discord = require('discord.js');
module.exports = (message) => {
    let me = message.embeds.shift();
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username,message.author.avatarURL)
    embed.setTitle(message.channel.name +" in "+message.guild.name)
    if(!message.content =="")
        embed.setDescription(message.content);
    else
        embed.setDescription("	**"+me.author.name+" : "+me.title+"**\n	"+(me.description||"")+((me.footer)?("\n	*At "+me.footer.text+"*"):""));
    embed.setFooter(message.createdAt)
    //embed.setTitle("Quote");
    return embed;
}
