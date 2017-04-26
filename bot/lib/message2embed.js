const Discord = require('discord.js');
module.exports = (message) => {
    let me = message.embeds.first();
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username,message.author.avatarURL)
    embed.setTitle(message.channel.name +" in "+message.guild.name)
    if(!message.content =="")
        embed.setDescription(message.content);
    else
        embed.setDescription("**"+me.author.name+" said in "+me.title+"**\n"+me.description+"\n *At "+me.footer+"*");
    embed.setFooter(message.createdAt)
    //embed.setTitle("Quote");
    return embed;
}
