
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */

async function command(params, message) {
    let permissions = message.channel.permissionsFor(message.member);
    if (permissions.has("MANAGE_MESSAGES")) {
        if (message.mentions.users && message.mentions.users.first()) {
            await Promise.all(message.mentions.users
                .map(u => {
                    message.channel.overwritePermissions(u, { 'SEND_MESSAGES': true }, "Unmuted");
                }))
            message.reply("Unmuted " + m.size + " users");
        }
        else
            message.reply("No one to unmute");
    }
    else
        message.reply("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif")
}
/**
 * description of the command
 */
const description = "unmutes a user";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
