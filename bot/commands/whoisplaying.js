
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let playing = message.guild.members.filterArray(function (m) {
        if (m.presence.game)
            if (m.presence.game.name.toLowerCase().includes(params.join(" ").toLowerCase()))
                return m;
    });
    if (params.length < 1)
        return await message.channel.sendMessage(playing.length + " are playing right now");
    else {
        let res = "List of players playing";
        for (let i = 0; i < playing.length; i++) {
            res = res + "/n" + playing[i].user.username + "#" + playing[i].user.discriminator;
        }
        message.channel.send(res, { split: true })
    }
}
/**
 * description of the command
 */
const description = "displays a list of users playing a specified game";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
