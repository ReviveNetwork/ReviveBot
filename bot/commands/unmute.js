
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const settings = require('./../../settings.json');
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
        message.channel.send("You aren't Worthy");
        return;
    }
    let mutei = settings.muted.findIndex(function (m) {
        if (m.id === message.mentions.users.first() && m.guild === message.guild.id)
            return true;
    });
    if (mutei && mutei >= 0) {
        settings.muted.splice(mutei, 1);
        message.reply("unmuted");
    }
    else
        message.reply("user was not muted");
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
