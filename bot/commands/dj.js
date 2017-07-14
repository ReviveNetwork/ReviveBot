
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.guild.roles.find("name", "DJ"))
        return message.reply("Sorry, this command is not applicable in this guild");
    if ((Date.now() - message.author.joinedTimestamp) < 2.628e+9)
        message.reply("You have to be a part of this guild for more than 1 month to earn this role");
    let m = await message.channel.send(message.author.toString() + " has applied to be a DJ. Please vote by clicking the below reactions");
    await m.react("✅");
    await m.react("⛔");
    let r = await m.awaitReactions(function (r) {
        return r.name == "✅" || r.name == "⛔";
    }, { maxUsers: 5, time: 3.6e+6 });
    let yes = r.find("name", "✅").users.size;
    let no = r.find("name", "⛔").users.size;
    await m.clearReactions();
    if (yes > no && (yes + no > 3)) {
        await m.edit(message.author.toString() + " is now a DJ");
        await message.member.addRole(message.guild.roles.find("name", "DJ"));
    }
    else
        await m.edit(message.author.toString() + ", you didnt recieve enough votes to be a DJ");
}
/**
 * description of the command
 */
const description = "applys for DJ role";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
