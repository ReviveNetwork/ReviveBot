const Discord = require('discord.js');
module.exports = (message) => {
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username)
    embed.setDescription(message.content);
    embed.setTimestamp(message.createdTimestamp)
    embed.setThumbnail(message.author.avatarURL);
    return embed;
}
