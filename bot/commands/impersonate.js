const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    let user = bot.users.random();
    //let ava = bot.user.displayAvatarURL;
    //await bot.user.setAvatar(user.displayAvatarURL);
    await message.guild.me.setNickname(user.username);
    if(params.length<1)
        await message.channel.send("No argument provided",{code:'error'});
    else
        await message.channel.send(params.join(" "));
    await message.guild.me.setNickname(bot.user.username);
    //await bot.user.setAvatar(ava);
}
/**
 * description of the command
 */
const description = "impersonate's some random person";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
