
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
        message.channel.sendMessage("You aren't Worthy");
        return;
    }
    let r = message.guild.roles.find("name", params[params.length - 1].trim());
    if(message.member.highestRole.comparePositionTo(r)<0)
        return message.reply("You can not add this role as it is higher than your highest role");
    return message.guild.member(message.mentions.users.first()).addRole(r);
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
