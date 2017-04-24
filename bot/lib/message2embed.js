const Discord = require('discord.js');
module.exports = (message) => {
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username,message.author.avatarURL)
    embed.setDescription(message.content);
    embed.setTimestamp(message.createdTimestamp)
    return embed;
}
