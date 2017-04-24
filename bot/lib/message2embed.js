const Discord = require('discord.js');
module.exports = (message) => {
    const embed = new Discord.RichEmbed();
    embed.author(message.author.username)
    embed.description(message.content);
    embed.setTimestamp(message.createdTimestamp)
    embed.setThumbnail(message.author.avatarURL);
    return embed;
}