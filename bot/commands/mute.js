
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const settings = require('./../../settings.json');
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
        message.channel.send("You aren't Worthy");
        return;
    }
    let mutei = settings.muted.find(function(m){
      if(m.id === message.mentions.first() && m.guild === message.guild.id)
        return true;
    });
    if(mutei)
    {
      return await message.reply("already muted");
    }
    else
        settings.muted.push({id: message.author.id, guild: message.guild.id});
    await message.reply("muted");
}
/**
 * description of the command
 */
const description = "Adds a role to a user. \nSyntax: add <mention> to role";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
