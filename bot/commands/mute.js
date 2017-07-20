
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
        await Promise.all(message.mentions.users
            .map(u => message.guild.member(u))
            .map(m => m.addRole(muted)))
        await message.reply(`Muted ${message.mentions.users.size} users`)
        return true
    }
    else{
        await message.reply("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif");
        return false;
    }
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
    description: description,
    mod: true
};
