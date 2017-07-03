const Discord = require('discord.js');
module.exports = async function (message, hotline){
    let me = message.embeds.shift();
    const embed = new Discord.RichEmbed();
    if(me && me!=null)
    {
        if(me.author && me.author.name)
            embed.author = {
                name: me.author.name,
                icon_url: me.author.icon_url
            }
        if(me.description)
            embed.description = me.description
        if(me.fields && me.fields.length >0)
        {
            me.fields.map(function(f){
                embed.fields.push({
                          name: f.name,
                          value: f.value,
                          inline: f.inline
                          });
            });
        }
        if(me.thumbnail)
            embed.thumbnail = me.thumbnail;
        if(me.image)
            embed.thumbnail = me.image;
        if(me.url)
            embed.url = me.url;
        if(me.title)
            embed.title = me.title;
        if(me.color)
            embed.color = me.color;
        if(me.timestamp)
            embed.timestamp = me.timestamp;
        if(me.footer)
            embed.footer = {
                icon_url: me.footer.icon_url,
                text: me.footer.text
              };
        return embed;
        //return message.reply("Embeds not supported yet")
    }
    embed.setAuthor(message.author.username, message.author.displayAvatarURL())
    if (!hotline)
        embed.setTitle((message.guild)?(message.channel.name + " in " + message.guild.name):(" in a DM with " + message.channel.recipient.tag));
    if (!message.content.trim() == "")
        embed.setDescription(message.cleanContent);
    else
        embed.setDescription("**" + (( me.author && me.author!=null)?(me.author.name+ " : "):"")  + ((me.title && me.title!=null)?me.title:"") + "**\n	" + (me.description || "") + ((me.footer) ? ("\n*At " + me.footer.text + "*") : ""));
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
