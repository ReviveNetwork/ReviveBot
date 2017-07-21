const settings = require('./../../settings.json');
const bot = require('./../bot');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    if (!settings.owners.includes(message.author.id)) {
        await message.reply('https://media.tenor.com/images/c472d1ee8c75a50f700bd028cc1b10b9/tenor.gif')
        return false;
    }
    if (params.length < 1)
        await message.channel.send("No argument provided", { code: 'error' });
    else
        await message.channel.send(params.join(" "), { disableEveryone: true });
    return true;
}
/**
 * description of the command
 */
const description = "say something via bot";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description,
    owner: true
};
