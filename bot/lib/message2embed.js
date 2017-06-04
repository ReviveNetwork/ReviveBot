const Discord = require('discord.js');
module.exports = async function (message, hotline){
    let me = message.embeds.shift();
    const embed = new Discord.RichEmbed();
    if(! message.webhookID)
        embed.setAuthor(message.author.username, message.author.avatarURL)
    else
    {
        const webhook = await message.fetchWebhook();
        embed.setAuthor(webhook.name, webhook.avatar)
    }
    if (!hotline)
        embed.setTitle((message.guild)?(message.channel.name + " in " + message.guild.name):(" in a DM with " + message.channel.recipient.tag));
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
