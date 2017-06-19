
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
    settings.muted.push({id: message.author.id, guild: message.guild.id});
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
