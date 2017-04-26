const Discord = require('discord.js');
module.exports = (message) => {
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username,message.author.avatarURL)
    embed.setTitle(message.channel.name +" in "+message.guild.name)
    embed.setDescription(message.content);
    embed.setFooter(message.createdAt)
    //embed.setTitle("Quote");
    return embed;
}
