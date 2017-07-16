
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const settings = require('./../../settings.json');
const createMute = require('./../lib/createMute');

async function command(params, message) {
    let muted = message.guild.roles.find(function (r) {
        if (r.name.toLowerCase().includes('mute')) return r
    })
    if (!muted)
        return muted = await createMute(guild);

    if (!(message.member.highestRole.position > muted.position)) {
        message.channel.send("You aren't Worthy\nhttps://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif");
        return;
    }

    let user = message.mentions.users.first();
    await message.guild.member(user).removeRole(muted);
    message.reply("unmuted");
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
