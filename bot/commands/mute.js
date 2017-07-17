
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let muted = message.guild.roles.find(function (r) {
        if (r.name.toLowerCase().includes('mute') && !r.name.toLowerCase().includes('non'))
            return r;
    })
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        message.mentions.users
            .map(u => msg.guild.member(u))
            .map(m => m.addRole(muted))
    }
    else
        message.reply("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif")
}
/**
 * description of the command
 */
const description = "Mutes a user";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
