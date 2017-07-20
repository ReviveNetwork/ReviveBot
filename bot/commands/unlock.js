const settings = require('./../../settings.json');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (settings.owners.includes(message.author.id)) {
        if (settings.lock) {
            await message.reply('Bot already unlocked');
            return true;
        }
        settings.lock = false;
        await message.reply('Bot unlocked');
        return true;
    }
    else {
        await message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif')
        return false;
    }
}
/**
 * description of the command
 */
const description = "unlocks the bot";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    owner: true
};
