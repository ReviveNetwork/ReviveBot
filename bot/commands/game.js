
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const settings = require('./../../settings.json');
const bot = require('./../bot');
async function command(params, message) {
    const member = bot.guilds.get("184536578654339072").member(message.author);
    if (!member) {
        await message.reply("Revive Network Members only");
        return false;
    }
    if (settings["game-roles"][params[0]]) {
        if (member.roles.get(settings["game-roles"][params[0]])) {
            await message.reply('You already have the role');
            return false;
        }
        await member.addRole(settings["game-roles"][params[0]]);
        await message.reply("Added " + params[0]);
        return true;
    }
    else {
        await message.reply("Game not found");
        return false;
    }
    return false;
}
/**
 * description of the command
 */
const description = "adds a game related channel to your channel list";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    custom: true
};
