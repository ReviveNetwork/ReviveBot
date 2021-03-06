
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
        message.channel.send("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif");
        return false;
    }
    let r = message.guild.roles.find("name", params[params.length - 1].trim());
    if (message.member.highestRole.comparePositionTo(r) < 0) {
        await message.reply("You can not remove this role as it is higher than your highest role");
        return false;
    }
    await message.guild.member(message.mentions.users.first()).removeRole(r);
    return true;
}
/**
 * description of the command
 */
const description = "removes a role to a user. \nSyntax: remove <mention> from role";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    mod: true
};
