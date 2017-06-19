
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
    let muted = message.guild.roles.find(function (r) {
        if (r.name.toLowerCase().includes('mute')) return r
    })
    if (!muted)
        muted = await message.guild.createRole({
            data: {
                name: 'muted',
                color: 'GREY',
                permissions: []
            },
            reason: 'to mute people'
        })
    let user = message.mentions.users.first();
    let member = message.guild.member(user).addRole(muted);
    message.reply("muted")
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
