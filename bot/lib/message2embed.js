const Discord = require('discord.js');
module.exports = async function (message) {
    let embed = message.embeds.filter(function(e){
        if(e.type== "rich")
            return e;
    }).shift();
    if (embed && embed != null) {
        return embed
    }
    embed = new Discord.MessageEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL())
    embed.setTitle((message.guild) ? (message.channel.name + " in " + message.guild.name) : (" in a DM with " + message.channel.recipient.tag));
    embed.setDescription(message.cleanContent);
    embed.setColor(message.member.displayColor);
    return embed;
}
