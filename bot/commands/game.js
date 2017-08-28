
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
    if (params[0].toLowerCase() == "all") {
        await Promise.all(settings["game-roles"].map(r => member.addRole(r)));
        await message.reply("done");
    }
    return await Promse.all(params.map(p => addGame(p.toLowerCase(), message))).reduce((p, c) => p || c);

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
async function addGame(game, message) {
    if (settings["game-roles"][game]) {
        if (member.roles.get(settings["game-roles"][game])) {
            await message.reply('You already have the role');
            return false;
        }
        await member.addRole(settings["game-roles"][game]);
        await message.reply("Added " + game);
        return true;
    }
    else {
        await message.reply("Not a valid game. Valid games are " + Object.keys(settings["game-roles"]).join(", "));
        return false;
    }
    return false;
}
