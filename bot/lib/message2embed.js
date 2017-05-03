const Discord = require('discord.js');
module.exports = (message, hotline) => {
    let me = message.embeds.shift();
    const embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL)
    if (!hotline)
        embed.setTitle(message.channel.name + " in " + message.guild.name)
    if (!message.content == "")
        embed.setDescription(message.cleanContent);
    else
        embed.setDescription("**" + me.author.name + " : " + me.title + "**\n	" + (me.description || "") + ((me.footer) ? ("\n*At " + me.footer.text + "*") : ""));
    if (!hotline)
        embed.setTimestamp(message.createdAt)
    let color = message.member;
    if (color) {
        color = color.roles.filter((r) => {
            if (r.color !== 0)
                return r;
        }).array().sort((r1, r2) => {
            if (r1.position < r2.position)
                return 1;
        }).shift();
        if (color)
            color = color.color;
    }
    else
        color = 0;
    embed.setColor(color);
    //embed.setTitle("Quote");
    return embed;
}
