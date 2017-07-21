
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!message.guild.roles.find("name", "DJ")) {
        await message.reply("Sorry, this command is not applicable in this guild");
        return false;
    }
    if (!message.member.roles.find((r) => r.name.toLowerCase().includes("member"))) {
        await message.reply("Sorry, you should be a verified member of this guild");
        return false;
    }
    if ((Date.now() - message.author.joinedTimestamp) < 2.628e+9) {
        await message.reply("You have to be a part of this guild for more than 1 month to earn this role");
        return false;
    }
    let m = await message.channel.send(message.author.toString() + " has applied to be a DJ. Please vote by clicking the below reactions");
    await m.react("✅");
    await m.react("⛔");
    let r = await m.awaitReactions(r => true, { maxUsers: 10, max: 10, time: 3.6e+6 });
    console.log(r);
    if (!r.get("✅") || !r.get("⛔"))
        return await message.reply("Error, votes could not be found");
    let yes = r.get("✅").users.size;
    let no = r.get("⛔").users.size;
    await m.clearReactions();
    if (yes > no && (yes + no > 6)) {
        await m.edit(message.author.toString() + " is now a DJ");
        await message.member.addRole(message.guild.roles.find("name", "DJ"));
        return true;
    }
    else
        await m.edit(message.author.toString() + ", you didnt recieve enough votes to be a DJ");
     return false;
   
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
    description: description,
    custom: true
};
